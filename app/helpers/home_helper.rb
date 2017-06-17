module HomeHelper
	def active_class(link_path)
    request.fullpath == link_path ? "mrf-current" : "not-current" 
  end
end
