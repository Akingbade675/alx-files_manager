{"payload":{"allShortcutsEnabled":false,"fileTree":{"":{"items":[{"name":"controllers","path":"controllers","contentType":"directory"},{"name":"routes","path":"routes","contentType":"directory"},{"name":"utils","path":"utils","contentType":"directory"},{"name":".eslintrc.js","path":".eslintrc.js","contentType":"file"},{"name":"README.md","path":"README.md","contentType":"file"},{"name":"babel.config.js","path":"babel.config.js","contentType":"file"},{"name":"package.json","path":"package.json","contentType":"file"},{"name":"server.js","path":"server.js","contentType":"file"},{"name":"worker.js","path":"worker.js","contentType":"file"}],"totalCount":9}},"fileTreeProcessingTime":1.9172239999999998,"foldersToFetch":[],"reducedMotionEnabled":null,"repo":{"id":502176163,"defaultBranch":"master","name":"alx-files_manager","ownerLogin":"Mahiuha","currentUserCanPush":false,"isFork":false,"isEmpty":false,"createdAt":"2022-06-10T20:43:55.000Z","ownerAvatar":"https://avatars.githubusercontent.com/u/35099243?v=4","public":true,"private":false,"isOrgOwned":false},"refInfo":{"name":"master","listCacheKey":"v0:1654894020.550167","canEdit":false,"refType":"branch","currentOid":"700e4cfd0398fe2fc39ee1e81a2e37c8fe1d2c0a"},"path":"worker.js","currentUser":null,"blob":{"rawLines":["import DBClient from './utils/db';","","const Bull = require('bull');","const { ObjectId } = require('mongodb');","const imageThumbnail = require('image-thumbnail');","const fs = require('fs');","","const fileQueue = new Bull('fileQueue');","","const createImageThumbnail = async (path, options) => {","  try {","    const thumbnail = await imageThumbnail(path, options);","    const pathNail = `${path}_${options.width}`;","","    await fs.writeFileSync(pathNail, thumbnail);","  } catch (error) {","    console.log(error);","  }","};","","fileQueue.process(async (job) => {","  const { fileId } = job.data;","  if (!fileId) throw Error('Missing fileId');","","  const { userId } = job.data;","  if (!userId) throw Error('Missing userId');","","  const fileDocument = await DBClient.db","    .collection('files')","    .findOne({ _id: ObjectId(fileId), userId: ObjectId(userId) });","  if (!fileDocument) throw Error('File not found');","","  createImageThumbnail(fileDocument.localPath, { width: 500 });","  createImageThumbnail(fileDocument.localPath, { width: 250 });","  createImageThumbnail(fileDocument.localPath, { width: 100 });","});"],"stylingDirectives":[[{"start":0,"end":6,"cssClass":"pl-k"},{"start":7,"end":15,"cssClass":"pl-v"},{"start":16,"end":20,"cssClass":"pl-k"},{"start":21,"end":33,"cssClass":"pl-s"},{"start":33,"end":34,"cssClass":"pl-kos"}],[],[{"start":0,"end":5,"cssClass":"pl-k"},{"start":6,"end":10,"cssClass":"pl-v"},{"start":11,"end":12,"cssClass":"pl-c1"},{"start":13,"end":20,"cssClass":"pl-en"},{"start":20,"end":21,"cssClass":"pl-kos"},{"start":21,"end":27,"cssClass":"pl-s"},{"start":27,"end":28,"cssClass":"pl-kos"},{"start":28,"end":29,"cssClass":"pl-kos"}],[{"start":0,"end":5,"cssClass":"pl-k"},{"start":6,"end":7,"cssClass":"pl-kos"},{"start":17,"end":18,"cssClass":"pl-kos"},{"start":19,"end":20,"cssClass":"pl-c1"},{"start":21,"end":28,"cssClass":"pl-en"},{"start":28,"end":29,"cssClass":"pl-kos"},{"start":29,"end":38,"cssClass":"pl-s"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":40,"cssClass":"pl-kos"}],[{"start":0,"end":5,"cssClass":"pl-k"},{"start":6,"end":20,"cssClass":"pl-s1"},{"start":21,"end":22,"cssClass":"pl-c1"},{"start":23,"end":30,"cssClass":"pl-en"},{"start":30,"end":31,"cssClass":"pl-kos"},{"start":31,"end":48,"cssClass":"pl-s"},{"start":48,"end":49,"cssClass":"pl-kos"},{"start":49,"end":50,"cssClass":"pl-kos"}],[{"start":0,"end":5,"cssClass":"pl-k"},{"start":6,"end":8,"cssClass":"pl-s1"},{"start":9,"end":10,"cssClass":"pl-c1"},{"start":11,"end":18,"cssClass":"pl-en"},{"start":18,"end":19,"cssClass":"pl-kos"},{"start":19,"end":23,"cssClass":"pl-s"},{"start":23,"end":24,"cssClass":"pl-kos"},{"start":24,"end":25,"cssClass":"pl-kos"}],[],[{"start":0,"end":5,"cssClass":"pl-k"},{"start":6,"end":15,"cssClass":"pl-s1"},{"start":16,"end":17,"cssClass":"pl-c1"},{"start":18,"end":21,"cssClass":"pl-k"},{"start":22,"end":26,"cssClass":"pl-v"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":27,"end":38,"cssClass":"pl-s"},{"start":38,"end":39,"cssClass":"pl-kos"},{"start":39,"end":40,"cssClass":"pl-kos"}],[],[{"start":0,"end":5,"cssClass":"pl-k"},{"start":6,"end":26,"cssClass":"pl-en"},{"start":27,"end":28,"cssClass":"pl-c1"},{"start":29,"end":34,"cssClass":"pl-k"},{"start":35,"end":36,"cssClass":"pl-kos"},{"start":36,"end":40,"cssClass":"pl-s1"},{"start":40,"end":41,"cssClass":"pl-kos"},{"start":42,"end":49,"cssClass":"pl-s1"},{"start":49,"end":50,"cssClass":"pl-kos"},{"start":51,"end":53,"cssClass":"pl-c1"},{"start":54,"end":55,"cssClass":"pl-kos"}],[{"start":2,"end":5,"cssClass":"pl-k"},{"start":6,"end":7,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-k"},{"start":10,"end":19,"cssClass":"pl-s1"},{"start":20,"end":21,"cssClass":"pl-c1"},{"start":22,"end":27,"cssClass":"pl-k"},{"start":28,"end":42,"cssClass":"pl-s1"},{"start":42,"end":43,"cssClass":"pl-kos"},{"start":43,"end":47,"cssClass":"pl-s1"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":49,"end":56,"cssClass":"pl-s1"},{"start":56,"end":57,"cssClass":"pl-kos"},{"start":57,"end":58,"cssClass":"pl-kos"}],[{"start":4,"end":9,"cssClass":"pl-k"},{"start":10,"end":18,"cssClass":"pl-s1"},{"start":19,"end":20,"cssClass":"pl-c1"},{"start":21,"end":47,"cssClass":"pl-s"},{"start":22,"end":29,"cssClass":"pl-s1"},{"start":22,"end":24,"cssClass":"pl-kos"},{"start":24,"end":28,"cssClass":"pl-s1"},{"start":28,"end":29,"cssClass":"pl-kos"},{"start":30,"end":46,"cssClass":"pl-s1"},{"start":30,"end":32,"cssClass":"pl-kos"},{"start":32,"end":39,"cssClass":"pl-s1"},{"start":39,"end":40,"cssClass":"pl-kos"},{"start":40,"end":45,"cssClass":"pl-c1"},{"start":45,"end":46,"cssClass":"pl-kos"},{"start":47,"end":48,"cssClass":"pl-kos"}],[],[{"start":4,"end":9,"cssClass":"pl-k"},{"start":10,"end":12,"cssClass":"pl-s1"},{"start":12,"end":13,"cssClass":"pl-kos"},{"start":13,"end":26,"cssClass":"pl-en"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":27,"end":35,"cssClass":"pl-s1"},{"start":35,"end":36,"cssClass":"pl-kos"},{"start":37,"end":46,"cssClass":"pl-s1"},{"start":46,"end":47,"cssClass":"pl-kos"},{"start":47,"end":48,"cssClass":"pl-kos"}],[{"start":2,"end":3,"cssClass":"pl-kos"},{"start":4,"end":9,"cssClass":"pl-k"},{"start":10,"end":11,"cssClass":"pl-kos"},{"start":11,"end":16,"cssClass":"pl-s1"},{"start":16,"end":17,"cssClass":"pl-kos"},{"start":18,"end":19,"cssClass":"pl-kos"}],[{"start":4,"end":11,"cssClass":"pl-smi"},{"start":11,"end":12,"cssClass":"pl-kos"},{"start":12,"end":15,"cssClass":"pl-en"},{"start":15,"end":16,"cssClass":"pl-kos"},{"start":16,"end":21,"cssClass":"pl-s1"},{"start":21,"end":22,"cssClass":"pl-kos"},{"start":22,"end":23,"cssClass":"pl-kos"}],[{"start":2,"end":3,"cssClass":"pl-kos"}],[{"start":0,"end":1,"cssClass":"pl-kos"},{"start":1,"end":2,"cssClass":"pl-kos"}],[],[{"start":0,"end":9,"cssClass":"pl-s1"},{"start":9,"end":10,"cssClass":"pl-kos"},{"start":10,"end":17,"cssClass":"pl-en"},{"start":17,"end":18,"cssClass":"pl-kos"},{"start":18,"end":23,"cssClass":"pl-k"},{"start":24,"end":25,"cssClass":"pl-kos"},{"start":25,"end":28,"cssClass":"pl-s1"},{"start":28,"end":29,"cssClass":"pl-kos"},{"start":30,"end":32,"cssClass":"pl-c1"},{"start":33,"end":34,"cssClass":"pl-kos"}],[{"start":2,"end":7,"cssClass":"pl-k"},{"start":8,"end":9,"cssClass":"pl-kos"},{"start":17,"end":18,"cssClass":"pl-kos"},{"start":19,"end":20,"cssClass":"pl-c1"},{"start":21,"end":24,"cssClass":"pl-s1"},{"start":24,"end":25,"cssClass":"pl-kos"},{"start":25,"end":29,"cssClass":"pl-c1"},{"start":29,"end":30,"cssClass":"pl-kos"}],[{"start":2,"end":4,"cssClass":"pl-k"},{"start":5,"end":6,"cssClass":"pl-kos"},{"start":6,"end":7,"cssClass":"pl-c1"},{"start":7,"end":13,"cssClass":"pl-s1"},{"start":13,"end":14,"cssClass":"pl-kos"},{"start":15,"end":20,"cssClass":"pl-k"},{"start":21,"end":26,"cssClass":"pl-v"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":27,"end":43,"cssClass":"pl-s"},{"start":43,"end":44,"cssClass":"pl-kos"},{"start":44,"end":45,"cssClass":"pl-kos"}],[],[{"start":2,"end":7,"cssClass":"pl-k"},{"start":8,"end":9,"cssClass":"pl-kos"},{"start":17,"end":18,"cssClass":"pl-kos"},{"start":19,"end":20,"cssClass":"pl-c1"},{"start":21,"end":24,"cssClass":"pl-s1"},{"start":24,"end":25,"cssClass":"pl-kos"},{"start":25,"end":29,"cssClass":"pl-c1"},{"start":29,"end":30,"cssClass":"pl-kos"}],[{"start":2,"end":4,"cssClass":"pl-k"},{"start":5,"end":6,"cssClass":"pl-kos"},{"start":6,"end":7,"cssClass":"pl-c1"},{"start":7,"end":13,"cssClass":"pl-s1"},{"start":13,"end":14,"cssClass":"pl-kos"},{"start":15,"end":20,"cssClass":"pl-k"},{"start":21,"end":26,"cssClass":"pl-v"},{"start":26,"end":27,"cssClass":"pl-kos"},{"start":27,"end":43,"cssClass":"pl-s"},{"start":43,"end":44,"cssClass":"pl-kos"},{"start":44,"end":45,"cssClass":"pl-kos"}],[],[{"start":2,"end":7,"cssClass":"pl-k"},{"start":8,"end":20,"cssClass":"pl-s1"},{"start":21,"end":22,"cssClass":"pl-c1"},{"start":23,"end":28,"cssClass":"pl-k"},{"start":29,"end":37,"cssClass":"pl-v"},{"start":37,"end":38,"cssClass":"pl-kos"},{"start":38,"end":40,"cssClass":"pl-c1"}],[{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":15,"cssClass":"pl-en"},{"start":15,"end":16,"cssClass":"pl-kos"},{"start":16,"end":23,"cssClass":"pl-s"},{"start":23,"end":24,"cssClass":"pl-kos"}],[{"start":4,"end":5,"cssClass":"pl-kos"},{"start":5,"end":12,"cssClass":"pl-en"},{"start":12,"end":13,"cssClass":"pl-kos"},{"start":13,"end":14,"cssClass":"pl-kos"},{"start":15,"end":18,"cssClass":"pl-c1"},{"start":20,"end":28,"cssClass":"pl-v"},{"start":28,"end":29,"cssClass":"pl-kos"},{"start":29,"end":35,"cssClass":"pl-s1"},{"start":35,"end":36,"cssClass":"pl-kos"},{"start":36,"end":37,"cssClass":"pl-kos"},{"start":38,"end":44,"cssClass":"pl-c1"},{"start":46,"end":54,"cssClass":"pl-v"},{"start":54,"end":55,"cssClass":"pl-kos"},{"start":55,"end":61,"cssClass":"pl-s1"},{"start":61,"end":62,"cssClass":"pl-kos"},{"start":63,"end":64,"cssClass":"pl-kos"},{"start":64,"end":65,"cssClass":"pl-kos"},{"start":65,"end":66,"cssClass":"pl-kos"}],[{"start":2,"end":4,"cssClass":"pl-k"},{"start":5,"end":6,"cssClass":"pl-kos"},{"start":6,"end":7,"cssClass":"pl-c1"},{"start":7,"end":19,"cssClass":"pl-s1"},{"start":19,"end":20,"cssClass":"pl-kos"},{"start":21,"end":26,"cssClass":"pl-k"},{"start":27,"end":32,"cssClass":"pl-v"},{"start":32,"end":33,"cssClass":"pl-kos"},{"start":33,"end":49,"cssClass":"pl-s"},{"start":49,"end":50,"cssClass":"pl-kos"},{"start":50,"end":51,"cssClass":"pl-kos"}],[],[{"start":2,"end":22,"cssClass":"pl-en"},{"start":22,"end":23,"cssClass":"pl-kos"},{"start":23,"end":35,"cssClass":"pl-s1"},{"start":35,"end":36,"cssClass":"pl-kos"},{"start":36,"end":45,"cssClass":"pl-c1"},{"start":45,"end":46,"cssClass":"pl-kos"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":49,"end":54,"cssClass":"pl-c1"},{"start":56,"end":59,"cssClass":"pl-c1"},{"start":60,"end":61,"cssClass":"pl-kos"},{"start":61,"end":62,"cssClass":"pl-kos"},{"start":62,"end":63,"cssClass":"pl-kos"}],[{"start":2,"end":22,"cssClass":"pl-en"},{"start":22,"end":23,"cssClass":"pl-kos"},{"start":23,"end":35,"cssClass":"pl-s1"},{"start":35,"end":36,"cssClass":"pl-kos"},{"start":36,"end":45,"cssClass":"pl-c1"},{"start":45,"end":46,"cssClass":"pl-kos"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":49,"end":54,"cssClass":"pl-c1"},{"start":56,"end":59,"cssClass":"pl-c1"},{"start":60,"end":61,"cssClass":"pl-kos"},{"start":61,"end":62,"cssClass":"pl-kos"},{"start":62,"end":63,"cssClass":"pl-kos"}],[{"start":2,"end":22,"cssClass":"pl-en"},{"start":22,"end":23,"cssClass":"pl-kos"},{"start":23,"end":35,"cssClass":"pl-s1"},{"start":35,"end":36,"cssClass":"pl-kos"},{"start":36,"end":45,"cssClass":"pl-c1"},{"start":45,"end":46,"cssClass":"pl-kos"},{"start":47,"end":48,"cssClass":"pl-kos"},{"start":49,"end":54,"cssClass":"pl-c1"},{"start":56,"end":59,"cssClass":"pl-c1"},{"start":60,"end":61,"cssClass":"pl-kos"},{"start":61,"end":62,"cssClass":"pl-kos"},{"start":62,"end":63,"cssClass":"pl-kos"}],[{"start":0,"end":1,"cssClass":"pl-kos"},{"start":1,"end":2,"cssClass":"pl-kos"},{"start":2,"end":3,"cssClass":"pl-kos"}]],"csv":null,"csvError":null,"dependabotInfo":{"showConfigurationBanner":false,"configFilePath":null,"networkDependabotPath":"/Mahiuha/alx-files_manager/network/updates","dismissConfigurationNoticePath":"/settings/dismiss-notice/dependabot_configuration_notice","configurationNoticeDismissed":null,"repoAlertsPath":"/Mahiuha/alx-files_manager/security/dependabot","repoSecurityAndAnalysisPath":"/Mahiuha/alx-files_manager/settings/security_analysis","repoOwnerIsOrg":false,"currentUserCanAdminRepo":false},"displayName":"worker.js","displayUrl":"https://github.com/Mahiuha/alx-files_manager/blob/master/worker.js?raw=true","headerInfo":{"blobSize":"1.05 KB","deleteInfo":{"deletePath":null,"deleteTooltip":"You must be signed in to make or propose changes"},"editInfo":{"editTooltip":"You must be signed in to make or propose changes"},"ghDesktopPath":"https://desktop.github.com","gitLfsPath":null,"onBranch":true,"shortPath":"b9fe0fb","siteNavLoginPath":"/login?return_to=https%3A%2F%2Fgithub.com%2FMahiuha%2Falx-files_manager%2Fblob%2Fmaster%2Fworker.js","isCSV":false,"isRichtext":false,"toc":null,"lineInfo":{"truncatedLoc":"36","truncatedSloc":"28"},"mode":"file"},"image":false,"isCodeownersFile":null,"isValidLegacyIssueTemplate":false,"issueTemplateHelpUrl":"https://docs.github.com/articles/about-issue-and-pull-request-templates","issueTemplate":null,"discussionTemplate":null,"language":"JavaScript","large":false,"loggedIn":false,"newDiscussionPath":"/Mahiuha/alx-files_manager/discussions/new","newIssuePath":"/Mahiuha/alx-files_manager/issues/new","planSupportInfo":{"repoIsFork":null,"repoOwnedByCurrentUser":null,"requestFullPath":"/Mahiuha/alx-files_manager/blob/master/worker.js","showFreeOrgGatedFeatureMessage":null,"showPlanSupportBanner":null,"upgradeDataAttributes":null,"upgradePath":null},"publishBannersInfo":{"dismissActionNoticePath":"/settings/dismiss-notice/publish_action_from_dockerfile","dismissStackNoticePath":"/settings/dismiss-notice/publish_stack_from_file","releasePath":"/Mahiuha/alx-files_manager/releases/new?marketplace=true","showPublishActionBanner":false,"showPublishStackBanner":false},"renderImageOrRaw":false,"richText":null,"renderedFileInfo":null,"tabSize":8,"topBannersInfo":{"overridingGlobalFundingFile":false,"globalPreferredFundingPath":null,"repoOwner":"Mahiuha","repoName":"alx-files_manager","showInvalidCitationWarning":false,"citationHelpUrl":"https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-citation-files","showDependabotConfigurationBanner":false,"actionsOnboardingTip":null},"truncated":false,"viewable":true,"workflowRedirectUrl":null,"symbols":{"timedOut":false,"notAnalyzed":false,"symbols":[{"name":"createImageThumbnail","kind":"function","identStart":233,"identEnd":253,"extentStart":233,"extentEnd":498,"fullyQualifiedName":"createImageThumbnail","identUtf16":{"start":{"lineNumber":9,"utf16Col":6},"end":{"lineNumber":9,"utf16Col":26}},"extentUtf16":{"start":{"lineNumber":9,"utf16Col":6},"end":{"lineNumber":18,"utf16Col":1}}}]}},"copilotUserAccess":null,"csrf_tokens":{"/Mahiuha/alx-files_manager/branches":{"post":"vUNYqApRT5odge_gGOFRSMyByAye6DhSHR1qXHvhjor99AFgGULTensr9hjG9ZHnr07oj8tSG6etgjiEWXp3rA"}}},"title":"alx-files_manager/worker.js at master · Mahiuha/alx-files_manager","locale":"en"}