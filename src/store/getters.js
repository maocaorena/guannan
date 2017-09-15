const getters = {
    routes: state => state.permission.routers,
    rightbars: state => state.permission.rightbars,
    leftbars: state => state.permission.leftbars,
    leftbarselected: state => state.permission.leftbarselected,
    leftbarsType: state => state.permission.leftbarsType,
    //新增弹窗状态
    firstStepAlert: state => state.monitorinstall.firstStepAlert,
    //第一步编辑或新增
    firstAdd: state => state.monitorinstall.firstAdd,
    //第一步编辑或新增的信息
    firstAddMessage: state => state.monitorinstall.firstAddMessage,
    //第二步编辑或新增
    secondAdd: state => state.monitorinstall.secondAdd,
    //第二步编辑或新增的信息
    secondAddMessage: state => state.monitorinstall.secondAddMessage,
    //第三步编辑或新增
    thirdAdd: state => state.monitorinstall.thirdAdd,
    //第三步编辑或新增的信息
    thirdAddMessage: state => state.monitorinstall.thirdAddMessage,
    // 新增用弹窗
    dialog: state => state.user.dialog,
};
export default getters
