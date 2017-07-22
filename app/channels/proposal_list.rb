class ProposalList < ApplicationCable::Channel
  def subscribed
    redis.set("user_proposal_lists", "1")
    stream_from "proposal_list_channel"
    ActionCable.server.broadcast "proposal_list_channel", message: true
    p "!!!!!!!!!!!!!!1"
  end

  def unsubscribed
    redis.del("user_proposal_lists")
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def redis
    Redis.new
  end
end