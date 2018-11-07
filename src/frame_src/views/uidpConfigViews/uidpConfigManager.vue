<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('configTable.CONF_NAME')" v-model="listQuery.CONF_NAME">
            </el-input>

            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('configTable.CONF_CODE')" v-model="listQuery.CONF_CODE">
            </el-input>

            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('configTable.search')}}</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('configTable.add')}}</el-button>
            <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('configTable.export')}}</el-button>

        </div>
        <el-card class="box-card">
            <el-table :key='tableKey' :data="list" :header-cell-class-name="tableRowClassName" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

                <el-table-column width="180px" align="center" :label="$t('configTable.CONF_CODE')">
                    <template slot-scope="scope">
                        <span>{{scope.row.CONF_CODE}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="200px" align="center" :label="$t('configTable.CONF_VALUE')">
                    <template slot-scope="scope">
                        <span>{{scope.row.CONF_VALUE}}</span>
                    </template>
                </el-table-column>

                <el-table-column width="300px" align="center" :label="$t('configTable.CONF_NAME')">
                    <template slot-scope="scope">
                        <span>{{scope.row.CONF_NAME}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" :label="$t('configTable.actions')" width="80px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('configTable.edit')}}</el-button>
                        <!--
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('configTable.delete')}}</el-button>
          -->
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="120px" style='width: 450px; margin-left:20px;'>
                <el-form-item v-if="dialogStatus=='create'" :label="$t('configTable.CONF_CODE')" prop="CONF_CODE">
                    <el-input v-model="temp.CONF_CODE"></el-input>
                </el-form-item>
                <el-form-item v-else :label="$t('configTable.CONF_CODE')" prop="CONF_CODE">
                    <span>{{temp.CONF_CODE}}</span>
                </el-form-item>
                <el-form-item :label="$t('configTable.CONF_VALUE')" prop="CONF_VALUE">
                    <el-input v-model="temp.CONF_VALUE" v-if="temp.CONF_CODE!='COLOR'"></el-input>
                    <el-radio-group v-model="temp.CONF_VALUE" v-else-if="temp.CONF_CODE==='COLOR'">
                        <el-radio :label="'#3A8EE6'"><span style="color:#3A8EE6">蓝色</span></el-radio>
                        <el-radio :label="'#C03639'"><span style="color:#C03639">红色</span></el-radio>
                        <el-radio :label="'#30B08F'"><span style="color:#30B08F">绿色</span></el-radio>
                        <el-radio :label="'#909399'"><span style="color:#909399">灰色</span></el-radio>
                    </el-radio-group>
                    <!-- <div v-if="temp.CONF_CODE==='COLOR'">
            提示：<span style="color:#3A8EE6">蓝色#3A8EE6</span>,
            <span style="color:#C03639">红色#C03639</span>,
            <span style="color:#30B08F">绿色#30B08F</span>,
            <span style="color:#909399">灰色#909399</span>。
          </div> -->
                </el-form-item>

                <el-form-item :label="$t('configTable.CONF_NAME')" prop="CONF_NAME">
                    <el-input v-model="temp.CONF_NAME"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{$t('configTable.cancel')}}</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('configTable.confirm')}}</el-button>
                <el-button v-else type="primary" @click="updateData">{{$t('configTable.confirm')}}</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import {
    fetchConfigList,
    createConfigArticle,
    updateConfigData,
    updateConfigArticle
} from "@/frame_src/api/config";
import waves from "@/frame_src/directive/waves"; // 水波纹指令
// import { parseTime } from '@/frame_src/utils'

export default {
    name: "uidpConfigManager",
    directives: {
        waves
    },
    data() {
        return {
            tableKey: 0,
            list: null,
            total: null,
            listLoading: true,
            listUpdate: {
                field: undefined,
                CONF_CODE: undefined
            },
            listQuery: {
                page: 1,
                limit: 20,
                CONF_NAME: undefined,
                CONF_VALUE: ""
            },
            statusOptions: ["published", "draft", "deleted"],

            editConfig: false,
            temp: {
                CONF_CODE: "",
                CONF_NAME: "",
                CONF_VALUE: ""
            },
            dialogFormVisible: false,
            dialogStatus: "",
            textMap: {
                update: "修改配置",
                create: "创建配置"
            },
            dialogPvVisible: false,
            pvData: [],
            rules: {
                CONF_CODE: [
                    {
                        required: true,
                        message: "配置项不能为空",
                        trigger: "change"
                    }
                ],
                CONF_VALUE: [
                    {
                        required: true,
                        message: "配置值不能为空",
                        trigger: "change"
                    }
                ]
            },
            downloadLoading: false
        };
    },
    methods: {
        getList() {
            this.listLoading = true;
            fetchConfigList(this.listQuery).then(response => {
                if (response.data.code === 2000) {
                    this.list = response.data.items;
                    this.total = response.data.total;
                    this.listLoading = false;
                } else {
                    this.listLoading = false;
                    this.$notify({
                        position: "bottom-right",
                        title: "失败",
                        message: response.data.message,
                        type: "error",
                        duration: 2000
                    });
                }
            });
        },
        resetTemp() {
            this.temp = {
                CONF_CODE: "",
                CONF_NAME: "",
                CONF_VALUE: ""
            };
        },
        handleUpdate(row) {
            // 修改数据弹出修改表单
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        handleCreate() {
            // 创建弹出表单
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        updateData() {
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    const tempData = Object.assign({}, this.temp); // 这样就不会共用同一个对象
                    updateConfigData(tempData).then(response => {
                        var message = response.data.message;
                        var title = "失败";
                        var type = "error";
                        if (response.data.code === 2000) {
                            this.getList();
                            title = "成功";
                            type = "success";
                            // for (const v of this.list) {
                            //   if (v.CONF_CODE === this.temp.CONF_CODE) {
                            //     const index = this.list.indexOf(v)
                            //     this.list.splice(index, 1, this.temp)
                            //     break
                            //   }
                            // }
                        }
                        this.dialogFormVisible = false;
                        this.$notify({
                            position: "bottom-right",
                            title: title,
                            message: message,
                            type: type,
                            duration: 2000
                        });
                    });
                }
            });
        },
        handleDelete(row) {
            this.temp = Object.assign({}, row); // copy obj
            this.listUpdate.CONF_CODE = this.temp.CONF_CODE;
            this.listUpdate.field = "deletaStatus";
            updateConfigArticle(this.listUpdate).then(response => {
                this.message = response.data.message;
                this.title = "失败";
                this.type = "error";
                if (response.data.code === 2000) {
                    // const index = this.list.indexOf(row)
                    // this.list.splice(index, 1)
                    this.getList();
                    this.title = "成功";
                    this.type = "success";
                }
                this.$notify({
                    position: "bottom-right",
                    title: this.title,
                    message: this.message,
                    type: this.type,
                    duration: 2000
                });
            });
        },
        createData() {
            // 创建配置
            this.$refs["dataForm"].validate(valid => {
                if (valid) {
                    // this.temp.userId = parseInt(Math.random() * 100) + 1024 // mock a id
                    // this.temp.author = "ppp" //当前登陆人
                    createConfigArticle(this.temp).then(response => {
                        var message = response.data.message;
                        var title = "失败";
                        var type = "error";
                        if (response.data.code === 2000) {
                            this.getList();
                            title = "成功";
                            type = "success";
                            // this.list.unshift(this.temp)
                        }
                        this.dialogFormVisible = false;
                        this.$notify({
                            position: "bottom-right",
                            title: title,
                            message: message,
                            type: type,
                            duration: 2000
                        });
                    });
                }
            });
        },
        handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
        handleDownload() {
            // 导出
            this.downloadLoading = true;
            import("@/frame_src/vendor/Export2Excel").then(excel => {
                const tHeader = ["配置项说明", "配置项", "配置值"];
                const filterVal = ["CONF_NAME", "CONF_CODE", "CONF_VALUE"];
                const data = this.formatJson(filterVal, this.list);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: "平台基本配置信息表"
                });
                this.downloadLoading = false;
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    return v[j];
                })
            );
        },
        handleFilter() {
            this.listQuery.page = 1;
            this.getList();
        },
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 0) {
                return "el-button--primary is-active"; // 'warning-row'
            } // 'el-button--primary is-plain'// 'warning-row'
            return "";
        }
    },
    created() {
        // var token = this.$store.state.user.name; 获取登陆信息的 俩种方式
        // var status = this.$store.getters.name;
        // alert(token+"ddd"+status);
        this.getList();
    }
};
</script>
<style lang="scss" scoped>
.filter-container {
    .el-radio-group {
        width: 300px;
    }
}
</style>