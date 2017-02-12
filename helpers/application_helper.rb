module ApplicationHelper
  def my_domain
    config = PostmanConfig.instance
    config.my_domain
  end
end
