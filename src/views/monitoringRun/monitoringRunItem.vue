<template>
    <div id="monitoringRunItem">
        <fanRunwatch v-if="$route.name === 'fanRunwatch'" :message="message" :openOrClose="openOrClose"></fanRunwatch>
        <smartMeters v-if="$route.name === 'smartMeters'" :message="message"></smartMeters>
        <hzWatch v-if="$route.name === 'hzWatch'" :message="message"></hzWatch>
    </div>
</template>

<script>
import { Util } from '../../lib/util.js';
import hzWatch from './hzWatch.vue';
import smartMeters from './smartMeters.vue';
import fanRunwatch from './fanRunwatch.vue';

export default {
    data() {
        return {
            deviceUUID: this.$route.query.monitoruid,
            openOrClose: '-1',
            message: {
                hours: '-',
                timedetail: '-',
                tem: '-',
                infilnegpressure: '-',
                outairpressure: '-',
                outairtemp: '-',
                oilpressure: '-',
                oiltemp: '-',
                fanfault: '未知',
                thermalmotorfault: '未知',
                infilnegpressurefault: '未知',
                outairpressurefault: '未知',
                outairtempfault: '未知',
                oilpressurelowfault: '未知',
                oiltempupfault: '未知',
                fanfault: '未知',
                tranfrequency: '-',
                bvm: '-',
                Tranalert: '未知',
                Transducerstate: '未知',
                avm: '-',
                bvm: '-',
                cvm: '-',
                aam: '-',
                bam: '-',
                cam: '-',
                posipower: '-',
                negipower: '-',
                powerfactor: '-'
            }
        }
    },
    components: {
        'hzWatch': hzWatch,
        'smartMeters': smartMeters,
        'fanRunwatch': fanRunwatch,
    },
    created() {
        let tabs = [
            {
                isurl: 'fanRunwatch',
                name: '风机运行监测'
            }, {
                isurl: 'smartMeters',
                name: '智能电表'
            }, {
                isurl: 'hzWatch',
                name: '变频器运行监测'
            }
        ];
        this.$store.dispatch('ChangeRightbar', tabs);
        let _this = this;
        this.api.createdGoEasy().then(res => {

            res.subscribe('/user/' + this.$route.query.monitoruid + '/msg', function (respnose) {
                console.log('-----全部数据-----', JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage));
                _this.message = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
            });
        });

        this.api.createdGoEasy().then(res => {
            res.subscribe('/topic/cQueryMonitorStatus', function (respnose) {
                let _data = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
                console.log('-------风机运行状态--------', _data);
                _this.openOrClose = _data.reply;
            });
        })

        this.api.createdGoEasy().then(res => {
            res.subscribe(('/topic/openMonitor'), function (respnose) {
                let _data = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
                console.log(state + 'Monitor', _data);
                if (_data.indexOf('打开') > -1) {
                    if (_data.indexOf('成功') > -1) {
                        _this.openOrClose = 1
                    };
                };
            });
        });

        this.api.createdGoEasy().then(res => {
            res.subscribe(('/topic/closeMonitor'), function (respnose) {
                let _data = JSON.parse(JSON.parse(respnose.body).WiselyResponse.responseMessage);
                console.log(state + 'Monitor', _data);
                if (_data.indexOf('关闭') > -1) {
                    if (_data.indexOf('成功') > -1) {
                        _this.openOrClose = 0
                    };
                };
            });
        })
        this.sendMessage()
    },
    methods: {
        sendMessage() {
            let _this = this;
            this.api.postN({
                url: '/readmonitordata/readMonitorData',
                params: {
                    deviceUUID: this.$route.query.monitoruid,
                },
                success: function (res) {
                    if (res.response.info.code == 100000) {
                        _this.$message.success({ message: res.response.info.msg, duration: Util.time() });
                    } else {
                        _this.$message.error({ message: res.response.info.msg, duration: Util.time() });
                    }
                },
                error: function (error) {
                    _this.$message.error({ message: '服务器错误', duration: Util.time() });
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
#monitoringRunItem {
    color: blue;
}
</style>
