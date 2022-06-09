/**
 * 格式化类型，用于转换不同的数据结构
 * 例如: 微信图文数据结构和本地高级图文数据结构不一样
 */
export const advanceItemToNewsItem = function(newsItem){//高级图文转微信图文
  return {
    "title": newsItem.title,
    "author": '',
    "digest": newsItem.description || '',
    "show_cover": true,
    "cover_url": newsItem.picurl,
    "content_url": newsItem.url,
    "source_url": newsItem.url
  }
};
