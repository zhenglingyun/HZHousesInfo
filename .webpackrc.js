let publicPathCdn = '/'; // 静态资源存放地址

if (
  process.env.BUILD_ENV === 'cloud' &&
  /^([^\/]+)\/(\d+\.\d+\.\d+)$/.test(process.env.BUILD_GIT_BRANCH)
) {
  // 云构建分支名规则： http://def.alibaba-inc.com/doc/publish/branch_name
  publicPathCdn =
    [
      '//g.alicdn.com', // alicdn 地址
      process.env.BUILD_GIT_GROUP,
      process.env.BUILD_GIT_PROJECT,
      process.env.BUILD_GIT_BRANCH.replace(/([^\/]+)\//, ''),
    ].join('/') + '/';
}

module.exports = {
  output: {
    publicPath: publicPathCdn,
  },
};
      