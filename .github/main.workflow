workflow "Build and deploy on push" {
  resolves = [
    "Deploy to GitHub Pages",
  ]
  on = "push"
}

action "yarn build" {
  uses = "Borales/actions-yarn@master"
  needs = ["yarn install"]
  args = "build"
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  args = "branch hexo"
  needs = ["yarn build"]
}

action "Deploy to GitHub Pages" {
  uses = "JamesIves/github-pages-deploy-action@master"
  needs = ["Filters for GitHub Actions"]
  env = {
    BRANCH = "master"
    FOLDER = "public"
  }
  secrets = ["ACCESS_TOKEN"]
}

action "yarn install" {
  uses = "Borales/actions-yarn@master"
  args = "install"
}
