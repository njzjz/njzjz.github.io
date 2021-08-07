---
title: Longhorn历险记I：自动生成TOTP
date: 2021-08-07
categories:
- Chemistry
---

今年，组里申到了Longhorn约二十万V100机时。Longhorn是Texas Advanced Computing Center（TACC）前年建成的超算，建成那年在TOP500排名120，不过目前已经下滑到228了，可见现在的硬件迭代速度飞快。这么多机时，它的队列又是空空荡荡的，那当然要尝试一下。尝试了两周，解决了两个很坑的问题，终于跑通了。

---

第一个问题是，Longhorn开了强制两步认证，登录时即使设置了密钥，仍会受到以下提示：

> To access the system:
>
> 1) If not using ssh-keys, please enter your TACC password at the password prompt
> 2) At the TACC Token prompt, enter your 6-digit code followed by <return>.
>
> (*****@longhorn.tacc.utexas.edu) TACC Token Code:

根据用户手册，我们需要下载一个名为TACC Token的App，扫码获取这个Token Code。

![image](https://user-images.githubusercontent.com/9496702/128594951-c6ce697c-3aa2-4775-881f-642b9d3f3c98.png)

乍看起来，这确实是WorkFlow的噩梦。当我们同时运行十几个甚至几十个WorkFlow时，可能随时都会发生登录事件，让程序去等待人类（可能在睡觉，可能在躺平，甚至可能不可描述）去输token，实在是不可接受的。

但是仔细一看，这个token，其实就是已经成为通用标准的“基于时间的一次性密码算法”（Time-based One-time Password，TOTP）。所谓TOTP，就是基于预设密钥和当前时间戳生成token的算法，维基百科的介绍如下：
  
![image](https://user-images.githubusercontent.com/9496702/128595327-391d645c-99fb-4bae-822f-5fcb00f1edef.png)
  
扫描二维码，会得到形如这样的地址：

> otpauth://totp/njzjz%3Anjzjz?secret=这里有一串密钥&issuer=TACC
  
`secret`后面的就是base32以后的密钥，可以用`base64.b32decode(secret)`进行解码；时间戳可以从`time.time()`得到；而TOTP算法所需的HMAC算法，则是Python内置的。因此我们生成TOTP的代码如下：

```py
def generate_totp(secret: str, period: int=30, token_length: int=6) -> int:
    """Generate time-based one time password (TOTP) from the secret.
    Some HPCs use TOTP for two-factor authentication for safety.
    Parameters
    ----------
    secret: str
        The encoded secret provided by the HPC. It's usually extracted
        from a 2D code and base32 encoded.
    period: int, default=30
        Time period where the code is valid in seconds.
    token_length: int, default=6
        The token length.
    
    Returns
    -------
    token: int
        The generated token.
    """
    timestamp = time.time()
    counter = int(timestamp) // period
    msg = struct.pack('>Q', counter)
    digest = hmac.new(base64.b32decode(secret), msg, hashlib.sha1).digest()
    ob = digest[19]
    pos = ob & 15
    base = struct.unpack('>I', digest[pos:pos + 4])[0] & 0x7fffffff
    token = base % (10**token_length)
    return str(token).zfill(token_length)
```

得到了TOTP的密钥后，我们把它喂给paramiko的password参数，这个问题就算解决了！
