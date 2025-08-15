export type PermissionDto = {
  id: number;
  employeeFirstName: string;
  employeeLastName: string;
  permissionTypeId: number;
  permissionTypeDescription: string;
  permissionDate: string;
};

export type CreatePermissionCommand = {
  employeeFirstName: string;
  employeeLastName: string;
  permissionTypeId: number;
  permissionDate: string;
};

export type ModifyPermissionCommand = {
  id: number;
  employeeFirstName: string;
  employeeLastName: string;
  permissionTypeId: number;
  permissionDate: string;
};

export type PermissionType = { id: number; description: string };
