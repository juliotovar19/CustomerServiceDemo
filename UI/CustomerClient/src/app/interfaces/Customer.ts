export interface Customer{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    created: string;
    updated: string;
    isEdit: boolean;
}


export const CustomerColumns = [  
    {
      key: 'id',
      type: 'number',
      label: 'Id',
      readonly: true
    },
    {
      key: 'firstName',
      type: 'text',
      label: 'First Name',
      required: true,
    },
    {
      key: 'lastName',
      type: 'text',
      label: 'Last Name',
      required: true,
    },
    {
      key: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      pattern: '.+@.+',
    },
    {
      key: 'created',
      type: 'date',
      label: 'Created',
      readonly: true
    },
    {
        key: 'updated',
        type: 'date',
        label: 'Updated',
        readonly: true
      },
      {
        key: 'isEdit',
        type: 'isEdit',
        label: 'Action',
      },

  ];