ActiveAdmin.register Customer do
  permit_params :full_name, :company, :site_url, :email, :city, :state, :phone, :find_through
  
  index do
    selectable_column
    id_column
    column :full_name
    column :company
    column :site_url
    column :email
    column :city
    column :state
    column :phone
    column :created_at
    actions
  end

  filter :full_name
  filter :email
  filter :company
  filter :created_at

  form do |f|
    f.inputs "Admin Details" do
      f.input :full_name
      f.input :company
      f.input :site_url
      f.input :email
      f.input :city
      f.input :state, as: :select, collection: Customer.const_get('STATES')
      f.input :phone
    end
    f.actions
  end

end
