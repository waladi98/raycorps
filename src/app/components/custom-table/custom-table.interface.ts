export interface CustomTable {
  filter: boolean;
  where_param?: WhereParam[];
  init_load: boolean;
  is_role: boolean;
  is_where?: boolean;
  is_role_params: RoleParams;
  endpoint: string;
  endpoint_local?: string;
  action_name: string;
  type: string;
  order: string;
  where: string;
  group: string;
  dynamic_header_field: string;
  dynamic_header_name: string;
  dynamic_header_value: string;
  dynamic_header_type: string;
  dynamic_header_add_index: number;
  filter_data: FilterData[];
  header: Header[];
  field: Field[];
  action: Action[];
  add_data?: Action;
  data: any[];
  sum?: Summary[];
  not_pagination?: boolean;
  export?: ExportData[];
  is_action?: boolean;
  is_backMaster?: boolean;
  filter_builder?: boolean;
  filter_builder_data?: any[];
  feeder?: Feeder[];
  pageSize?: number;
  expand?: boolean;
  expand_data?: Expand;
  temp?: any;
  action_selected?: Action[];
}

export interface FilterData {
  id: string;
  label: string;
  data_list: any[];
  type: string;
  is_filter: boolean;
  value: string;
  trigger: boolean;
  trigger_id: string;
  trigger_params: string;
  first_index_selected?: boolean;
  api: Api;
}

export interface Api {
  endpoint?: string;
  where?: string;
  prodi_role?: ProdiRole;
  id?: string;
  label?: string;
  concat?: Concat[];
}

export interface Concat {
  type: string;
  field: string;
}

export interface Header {
  tooltip?: string;
  type: string;
  translate?: string;
  label: string;
  class: string;
  field: string;
  filter: boolean;
  filter_type: string;
  filter_value: string;
  sort: boolean;
  sort_type: string;
  data: any[];
  colspan?: string;
}

export interface Field {
  type: string;
  class: string;
  field: string;
  count_field: any[];
  condition?: Condition;
}

export interface Action {
  label?: string;
  id_params?: string;
  id_params_local?:string;
  route?: string;
  condition?: Condition[];
  controller?: string;
  type?: string;
  icon?: string;
  toolTip?: string;
  api?: Api;
  action_array?: Action[];
  add_data?: Action[];
}

export interface ProdiRole {
  param: string;
  is_role: boolean;
}

export interface RoleParams {
  prodi?: string;
}

export interface Condition {
  params_1?: string;
  value_1?: string;
  params_2?: string;
  value_2?: string;
  operator?: string;
  field?: string;
  is_show_value?: boolean;
  is_params_value?: string;
  default?: string;
}

export interface Summary {
  type: string;
  label: string;
  class: string;
  colspan: string;
  field: string;
  value: any;
}

export interface ExportData {
  type: string;
  label: string;
  label_report: string;
}

export interface Expand {
  list: ExpandList[];
}

export interface ExpandList {
  label: string;
  params_set: string;
  params_get: string;
  data?: CustomTable;
}

export interface Feeder {
  label: string;
  api: string;
  class: string;
  number_process: number;
}

export interface WhereParam {
  field: string;
  value: string;
  type: string;
}
