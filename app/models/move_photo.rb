class MovePhoto < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
end
