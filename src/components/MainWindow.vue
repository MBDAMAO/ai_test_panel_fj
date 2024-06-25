<template>
  <div class="container">
    <el-dialog v-model="dialogTableVisible" title="Help" width="800">
      <MD />
    </el-dialog>
    <div class="card">
      <el-icon class="icon" @click="dialogTableVisible = true">
        <QuestionFilled />
      </el-icon>
      <div class="left">
        <p
          style="font-size: 30px; position: absolute; top:20px;color:black;font-family: 'Times New Roman', Times, serif;">
          QcEval</p>
        <p
          style="font-size: 20px;position: absolute; top:110px;color:black;font-family: 'Times New Roman', Times, serif;">
          A Tool to Evaluate Code Generation
          Models Quickly
        </p>
        <div class="fake" style="height: 15%;"></div>
        <p>Select Dataset and Language</p>
        <div class="param">
          <el-cascader :options="options" style="width: 100%;" v-model="nps" filterable />
        </div>
        <div class="fake" style="height: 2%;"></div>
        <div class="param">
          <el-input v-model="inp2" style="width: 100%" :autosize="{ minRows: 2, maxRows: 18 }" type="textarea"
            placeholder="Please enter generateData when about to evaluate." />
        </div>
        <div class="fake" style="height: 2%;"></div>
        <div class="input" onclick="hiddenFileInput.click()">Import</div>
        <div class="fake" style="height: 2%;"></div>
        <div class="param">
          <button class="download" @click="download()" :disabled="isDisable" v-loading="loading">Search</button>
          <div class="fake" style="width: 10%;"></div>
          <button class="download" @click="evaluteData()" :disabled="isDisable" v-loading="loading">Evalute</button>
        </div>
        <div class="fake" style="height: 2%;"></div>
        <div class="download" @click="exportData()">Export</div>
        <div class="fake" style="height: 2%;"></div>
      </div>
    </div>
    <div class=" tablebox">
      <el-button class="clearTable" type="primary" @click="clearTable()">Clear</el-button>
      <el-table :data="tableData" border stripe style="width: 100%; height: 100%;">
        <el-table-column prop="task_id" label="Task_id" width="180" />
        <el-table-column prop="entry_point" label="Entry_point" width="180" />
        <el-table-column prop="prompt" label="Prompt/Result" />
      </el-table>
    </div>
    <div class="borderBox"></div>
    <input type="file" name="hiddenFileInput" id="hiddenFileInput" style="display: none;" />

  </div>
</template>

<script lang="ts" setup>
import { getDataSet, evalute } from "@/apis/interfaces"
import { ElMessage } from "element-plus";
import MD from "@/components/md"
import { options } from "./options"
import { ref, onMounted, reactive } from "vue"
const inp2 = ref()
let nps = reactive([])
const tableData = ref()
const inp3 = ref()
let isDisable = ref(false)
inp3.value = 0
function clearTable() {
  tableData.value = []
}
function download() {
  console.log(nps, nps[0], nps[1], inp3.value)
  if (!(nps && nps[0] && nps[1] && inp3.value != null)) {
    ElMessage({
      showClose: true,
      message: "请设置全部参数！",
      type: "error",
    });
    return;
  }
  loading.value = true
  isDisable.value = true
  getDataSet(nps[0], nps[1], inp3.value).then((resp) => {
    let res = resp.data;
    loading.value = false
    isDisable.value = false
    if (!res || res.length == 0 || JSON.stringify(res) == "{}") {
      ElMessage({
        showClose: true,
        message: "请求成功！无当前种类数据集",
        type: "warning",
      });
      return;
    }
    ElMessage({
      showClose: true,
      message: "请求成功！",
      type: "success",
    });
    tableData.value = res;
  })
}
function exportData() {
  let data = tableData.value;
  if (!data || data.length == 0 || JSON.stringify(data) == "{}") {
    ElMessage({
      showClose: true,
      message: "数据为空，无法导出！",
      type: "error",
    }); return;
  }
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  var downloadAnchor = document.createElement('a');
  downloadAnchor.href = dataStr;
  downloadAnchor.download = `dataset.json`;
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  document.body.removeChild(downloadAnchor);
}
let dialogTableVisible = ref(false)
let loading = ref(false)
function evaluteData() {
  let data = tableData.value;
  if (inp2.value != null) {
    try {
      data = JSON.parse(inp2.value)
    } catch (errors) {
      ElMessage({
        showClose: true,
        message: "JSON格式解析失败，请输入JSON数据！",
        type: "error",
      });
      return;
    }
    ElMessage({
      showClose: true,
      message: "检测到输入，优先使用输入数据",
      type: "success",
    });
  }
  if (!(nps && nps[0] && nps[1] && inp3.value != null) || (!data || data.length == 0 || JSON.stringify(data) == "{}")) {
    ElMessage({
      showClose: true,
      message: "请设置全部参数！",
      type: "error",
    });
    return;
  }
  let generateData: any = [];
  let f = true;
  if ((data instanceof Array)) {
    data.forEach(element => {
      if (!('result' in data || 'prompt' in data) && 'task_id' in data) {
        ElMessage({
          showClose: true,
          message: "参数类型不正确！",
          type: "error",
        });
        f = false;
        return;
      }
    });
  } else {
    ElMessage({
      showClose: true,
      message: "请输入Array！",
      type: "error",
    });
    f = false;
    return;
  }
  if (!f) {
    return;
  }
  data.forEach(element => {
    generateData.push({ task_id: element.task_id, result: element.result ? element.result : [element.prompt] });
  });
  loading.value = true
  isDisable.value = true
  evalute({
    "datasetName": nps[0],
    "language": nps[1],
    "isTest": inp3.value,
    "generateData": generateData
  }).then((resp) => {
    let res = resp.data;
    loading.value = false
    isDisable.value = false
    ElMessage({
      showClose: true,
      message: "结果已保存到evaluteResult.json",
      type: "success",
    });
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(res, null, 2));
    var downloadAnchor = document.createElement('a');
    downloadAnchor.href = dataStr;
    downloadAnchor.download = `evaluteResult.json`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  })
}
onMounted(() => {
  var hiddenFileInput = document.getElementById('hiddenFileInput');
  hiddenFileInput?.addEventListener('change', function (event) {
    console.log("upload")
    var file = event.target.files[0];
    if (file) {
      if (file.type.match('application/json')) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var jsonFile = JSON.parse(e.target.result).generateData;
          let generateData = []
          jsonFile.forEach(element => {
            generateData.push({ task_id: element.task_id, prompt: JSON.stringify(element.result) })
          })
          console.log('解析后的JSON对象:', jsonFile);
          if (jsonFile instanceof Array) {
            let flag = true;
            jsonFile.forEach((element) => {
              if (!('task_id' in element && 'result' in element)) {
                flag = false;
              }
            })
            if (flag) {
              ElMessage({
                showClose: true,
                message: "导入成功！",
                type: "success",
              });
              tableData.value = generateData;
              return;
            }
          }
          ElMessage({
            showClose: true,
            message: "格式不正确，导入失败！",
            type: "error",
          });
        };
        reader.readAsText(file);
      } else {
        ElMessage({
          showClose: true,
          message: "请选择一个JSON文件",
          type: "error",
        });
      }
    } else {
      ElMessage({
        showClose: true,
        message: "未选择文件",
        type: "warning",
      });
    }
  });
})
import { ElMessageBox } from 'element-plus'

const open = () => {
  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      type: 'warning',
    }
  )
}
</script>


<style scoped>
.download {
  border: 0;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100%;
  border-radius: 8PX;
  background-color: RGB(85, 61, 233);
}

.icon {
  position: absolute;
  z-index: 1;
  left: 20px;
  top: 20px;
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.input {
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100%;
  border-radius: 8PX;
  background-color: RGB(104, 195, 61);
}

.card {
  position: relative;
  color: rgb(76, 86, 100);
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px 0 0 20px;
  height: 800px;
  background-color: white;
  width: 500px;
}

.tablebox {
  height: 800px;
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 60%;
}

.inp {
  height: 100%;
  width: 300px;
  padding: 0 0 0 15px;
  margin-top: 10px;
  border: 0;
  background-color: rgba(190, 190, 190, 0.3);
  border-radius: 10px;
  color: rgb(255, 255, 255, 1);
}

.container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: rgb(41, 42, 55);
}

.borderBox {
  background-color: white;
  height: 800px;
  width: 1%;
  border-radius: 0 20px 20px 0;
}

.param {
  justify-content: space-between;
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
}

.tishi {
  height: 100%;
  width: 100px;
  display: flex;
  justify-items: center;
  align-items: center;
}

.left {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
  align-items: center;
}

.right {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
}

.clearTable {
  border-radius: 0;
  background-color: rgb(95, 51, 232);
  height: 20px;
  border: 0;
  /* width: 200px; */
}

.evalutes {}
</style>
