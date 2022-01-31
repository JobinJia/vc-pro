import type { DataTableProps } from 'naive-ui'

export interface TableRequest {
  api?: (args?: any) => Promise<any>
  before?: (args?: any) => Promise<any>
  after?: (args?: any) => Promise<any>
}

export interface VcDataTableProps extends DataTableProps {
  request: TableRequest
}
