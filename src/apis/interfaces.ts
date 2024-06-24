import request from "@/utils/request";
export interface evaluteDTO {
  datasetName: string;
  language: string;
  isTest: number;
  gengerateData: [
    {
      "task-id": string;
      result: string;
    }
  ];
}
//?dataset_name=humaneval-x&language=JavaScript&is_test=0
export function getDataSet(
  dataset_name: string,
  language: string,
  is_test: number
) {
  return request({
    url: `/api1/getDataset?dataset_name=${dataset_name}&language=${language}&is_test=${is_test}`,
    method: "get",
  });
}

export function evalute(data: evaluteDTO) {
  return request({
    url: "/api2/evaluateModule",
    method: "post",
    data: data,
  });
}
