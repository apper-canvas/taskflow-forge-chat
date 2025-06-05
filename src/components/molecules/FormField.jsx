import React from 'react';
      import Label from '@/components/atoms/Label';
      import Input from '@/components/atoms/Input';
      import Select from '@/components/atoms/Select';

      const FormField = ({ label, type = 'text', value, onChange, placeholder, options, rows, required = false, autoFocus = false, ...props }) => {
        let fieldComponent;
        const commonProps = {
          value,
          onChange,
          className: 'w-full',
          required,
          ...props
        };

        switch (type) {
          case 'text':
          case 'date':
            fieldComponent = <Input type={type} placeholder={placeholder} autoFocus={autoFocus} {...commonProps} />;
            break;
          case 'textarea':
            fieldComponent = (
              <textarea
                rows={rows}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                {...commonProps}
              />
            );
            break;
          case 'select':
            fieldComponent = <Select options={options} {...commonProps} />;
            break;
          default:
            fieldComponent = <Input type={type} placeholder={placeholder} {...commonProps} />;
        }

        return (
          <div>
            {label && <Label>{label}</Label>}
            {fieldComponent}
          </div>
        );
      };

      export default FormField;