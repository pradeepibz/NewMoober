class ContactsController < InheritedResources::Base

  def index
    @contact = Contact.new
  end
  def create
    @contact = Contact.new(contact_params)
    respond_to do |format|
      if @contact.save
        AdminUser.all.each do |admin|
          CustomerMailer.contact_email(@contact,admin).deliver
        end
        format.html { redirect_to contact_us_path, notice: 'Successfully sent user details' }
      else
        format.html { render "home/contact_us" }
        # redirect_to :back, notice: @customer.errors
      end
    end
  end

  private

    def contact_params
      params.require(:contact).permit(:full_name, :email, :message,:mobile)
    end
end

