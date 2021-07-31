---
title: DP-GUI：一周内，从提出idea到落地
date: 2021-07-31
categories:
- Chemistry
tags:
- deepmd
---

去年，DeePMD-kit的开发者意识到了文档的重要性，给输入的JSON文件`input.json`的所有参数添加了相应的文档。为了实现这一重要目标，Yixiao将配置参数抽象成了`dargs.Arugenment`和`dargs.Variant`类，每个`Arugenment`类代表一个参数，类的属性里还有允许类型、文档、允许的子`Argument`等信息；`Variant`则表示不同的配置变种，例如`local_frame`描述符和`se_e2_a`描述符。就在此时，我们看到[Sion Wang](https://www.zhihu.com/people/sion-wang-29)吐槽过DeePMD-kit缺少文档，用起来是最痛苦的。

除了文档以外，我们也意识到，一个优秀的用户界面（user interface，UI）也可以大幅度提升用户体验。JSON文件是一种对程序友好却反人类的语言，常常看到有用户这里多一个逗号、那里少一个逗号。我们也发现，有时用户也会把参数写错位置，却不知错在哪里。例如，在下面节选的参数中，`type_map`是`model`的子参数，但有用户把`type_map`放在`model`之前，使其无法被正确读取。

```json
  
{
    "model": {
	"type_map":	["O", "H"],
	"descriptor" :{
	    "type":		"se_e2_a",
	    "sel":		[46, 92],
	    "rcut_smth":	0.50,
	    "rcut":		6.00,
	    "neuron":		[25, 50, 100],
	    "resnet_dt":	false,
	    "axis_neuron":	16,
	    "seed":		1
	},
	"fitting_net" : {
	    "neuron":		[240, 240, 240],
	    "resnet_dt":	true,
	    "seed":		1
	}
    }
}
```


因此，我常常想着能否为用户提供一个图形界面（graphical user interface，GUI），生成这些JSON文件。很多科学计算软件都只有命令行界面（command line interface，CLI），GUI位于鄙视链的最末端，但我认为应该给新手提供更加友好的环境。

上周，我想到了一个绝妙的idea，立即在开发群里提出，获得了其它开发者的赞同：<!--more-->

> 有一个idea，把dargs的参数导出，然后做一个web-based GUI，读取dargs的参数生成表单，给用户填写，生成各软件的输入文件。

如何把dargs的`Argument`导出为JSON呢？起初，我想像生成文档的方法一样，给`Argument`和`Variant`加一个`gen_json`的方法。但是略加检索后发现，Python有一个`json.JSONEncoder`类，就是专门用来把对象encode成JSON的。我们只需要继承这个类，给我们需要转换、但这个类不支持的type添加相应的转换规则：
```py
class ArgumentEncoder(json.JSONEncoder):
    def default(self, obj) -> Dict[str, Union[str, bool, List]]:
        if isinstance(obj, Argument):
            return {
                "object": "Argument",
                "name": obj.name,
                "type": obj.dtype,
                "optional": obj.optional,
                "alias": obj.alias,
                "doc": obj.doc,
                "repeat": obj.repeat,
                "sub_fields": obj.sub_fields,
                "sub_variants": obj.sub_variants,
            }
        elif isinstance(obj, Variant):
            return {
                "object": "Variant",
                "flag_name": obj.flag_name,
                "optional": obj.optional,
                "default_tag": obj.default_tag,
                "choice_dict": obj.choice_dict,
                "choice_alias": obj.choice_alias,
                "doc": obj.doc,
            }
        elif isinstance(obj, type):
            return obj.__name__
        return json.JSONEncoder.default(self, obj)
```

这里，我们转换了`Argument`、`Variant`和`type`，之后把`ArgumentEncoder`类放入`json.dumps`的`cls`参数，即可输出JSON字符串：
```py
json.dumps(some_arg, cls=ArgumentEncoder)
```

得到了JSON文件后，这周一，我就把目光转向web-based App。2021年了，我们当然使用目前最流行的前端框架：Vue。恰好，这种动态的数据非常符合Vue的数据驱动视图的理念。在上面示例的JSON文件中，参数是个层层嵌套的形式，而我们很容易想到，Vue框架的组件（component）也可以层层嵌套，正好可以对应一个`Argument`或者`Variant`类。于是，一个`DargsItem.vue`的组件便诞生了：
```vue
<!-- 节选了重要的逻辑代码 -->
<template>
  <!-- list -->
  <div class="w-100" v-if="Array.isArray(jdata)">
    <v-list-item v-for="item in jdata" :key="item.name">
      <DargsItem :jdata="item" ref="subitem" />
    </v-list-item>
  </div>
  <div class="w-100 mx-1" v-else-if="jdata.object == 'Argument'">
    <!-- 这里有用户输入框的逻辑，略 -->
    <v-list-item v-for="item in jdata.sub_fields" :key="item.name">
      <DargsItem :jdata="item" ref="subitem" />
    </v-list-item>
    <v-list-item v-for="item in jdata.sub_variants" :key="item.name">
      <DargsItem :jdata="item" ref="subvariant" />
    </v-list-item>
  </div>
  <div class="w-100" v-else-if="jdata.object == 'Variant'">
    <v-tab-item v-for="item in jdata.choice_dict" :key="item.name" eager>
      <DargsItem :jdata="item" ref="subitem" />
    </v-tab-item>
  </div>
</template>
```
完整的代码可以在[这里](https://github.com/deepmodeling/dpgui/blob/2def988af08aaeb21a4b8b045f969e25e37b015e/src/components/dargs/DargsItem.vue)看到。在用户视图中，我们将输入的数据`jdata`通过`if`和`else`分为了三个类型，`list`（表示多个`Argument`）、`Argument`（可能有若干个sub fields或者sub fields）和`Variant`（有若干个choice，即`Argument`），每个类型都可能通过`for`来嵌套若干个子组件。而真正的用户输入框，则位于`Argument`内，也是通过一组`if-else`将不同的type分成了文本框（对应str、int、float）、多行文本框（list）、switch按钮（bool），并提供了额外的下拉框用于在多个接受的类型中选择一个，额外的switch按钮用于可选项的选择。参数的文档则放在了hint的位置。

![image](https://user-images.githubusercontent.com/9496702/127730464-25b632cc-3695-425b-84bd-ee8ad86d9af7.png)

搞定一个简陋（艺术感欠缺）但可以用的界面后，我们需要实现两个功能：导出JSON（`dvalue`方法）、导入JSON（`load`方法），刚好是相反的。值得注意的是，这两个方法也需要层层嵌套，节选`dvalue`的代码如下：
```js
methods: {
    /**
     * Get a object.
     * @returns {object} The returned obj.
     */
    dvalue: function () {
      if (Array.isArray(this.jdata)) {
        return Object.fromEntries(
          new Map(
            this.$refs["subitem"]
              .filter((vv) => !vv.jdata.optional || vv.check)
              .map((vv) => [vv.jdata.name, vv.dvalue()])
          )
        );
      } else if (this.jdata.object == "Argument") {
```
这里的技术难点在于，如何获取`sub_fields`的组件？我们在template内已经给所有子组件标记了`ref="subitem"`，因此用`this.$refs["subitem"]`即可得到所有子组件的列表。

我们还需要设置传入参数，这个组件就算完工了。之后，我们再创建一个`dargs.vue`组件，把`DargsItem`包起来，同时提供一个从本地载入JSON的按钮，以及导出JSON的按钮，也设置同样的传入参数：
```js
  props: {
    jdata: [Object, Array],
  },
```

这样，一个`darg`组件，就能够表示一个软件的所有参数。那么，如何切换不同软件的参数呢？这时就需要引入路由（router）了。
```js
Vue.use(VueRouter)

const routes = [
  {
    path: '/input/:id',
    name: 'User Input',
    component: () => import(/* webpackChunkName: "input" */ '../views/Input.vue')
  },
  // 其余路由略
]
```

通过在路由路径中加入参数`:id`，我们便可以在访问input页面时，用不同的路径加载不同模板了。为了让用户可以自己添加模板，我们也引入了Storge功能：

![image](https://user-images.githubusercontent.com/9496702/127730674-bda28e8c-5ea4-4076-b4c6-54edf8c8cf89.png)

这时候，我们把这个App取名为DP-GUI，DP-GUI就算基本能用了，访问地址为[https://deepmodeling.org/dpgui/](https://deepmodeling.org/dpgui/)。而这时候的准确时间为这周三，距离提出idea，刚好是一周的时间。
