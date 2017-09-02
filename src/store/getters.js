const getters = {
    routes: state => state.permission.routers,
    rightbars: state => state.permission.rightbars,
    leftbars: state => state.permission.leftbars,
    leftbarselected: state => state.permission.leftbarselected,
    leftbarsType: state => state.permission.leftbarsType,
    //新增弹窗状态
    firstStepAlert: state => state.monitorinstall.firstStepAlert,
};
export default getters
