ActiveAdmin.register Contact do
  permit_params :full_name, :email, :mobile, :message
  
  index do
    selectable_column
    id_column
    column :full_name
    column :email
    column :mobile
    column :message
    column :created_at
    actions
  end

  filter :full_name
  filter :email
  filter :mobile
  filter :created_at

  form do |f|
    f.inputs "Contact Details" do
      f.input :full_name
      f.input :email
      f.input :mobile
      f.input :message
    end
    f.actions
  end

end
