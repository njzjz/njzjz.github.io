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
  env = {
    CI = "github_actions"
    CI_REPO_NAME = "njzjz.github.io"
    CI_REPO_OWNER = "njzjz"
    CI_COMMIT_MESSAGE = ""
  }
  secrets = ["BUNDLESIZE_GITHUB_TOKEN"]
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
    BASE_BRANCH = "hexo"
  }
  secrets = ["ACCESS_TOKEN"]
}

action "yarn install" {
  uses = "Borales/actions-yarn@master"
  args = "install"
}
