module HomeHelper
	def active_class(link_path)
    request.fullpath == link_path ? "active" : "not_active" 
  end
end
