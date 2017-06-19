ActiveAdmin.register Subscriber do
  permit_params :email
  
  index do
    selectable_column
    id_column
    column :email
    column :created_at
    actions
  end

  filter :email
  filter :created_at

  form do |f|
    f.inputs "Subscriber Details" do
      f.input :email
    end
    f.actions
  end

end
