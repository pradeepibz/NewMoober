ActiveAdmin.register PromoCode do
  permit_params :facebook_user_id, :promo_code, :is_used, :discount

  index do
    selectable_column
    id_column
    column :facebook_user_id
    column :promo_code
    column :is_used
    column :discount
    column :created_at
    actions
  end

  filter :facebook_user_id
  filter :promo_code
  filter :created_at

  form do |f|
    f.inputs "Admin Details" do
      f.input :facebook_user_id
      f.input :promo_code
      f.input :is_used
    end
    f.actions
  end

end
