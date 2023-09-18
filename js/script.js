{
    'use strict';
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    //console.log(event);

    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
        //console.log(activeLink.classList.contains('active'));
        }

    /* add class 'active' to the clicked link */
    //console.log('clickedElement:', clickedElement);
    //console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');
    //console.log(clickedElement.classList.contains('active'));

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article');
    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
        //console.log(activeArticle.classList.contains('active'));
        }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
  
  const links = document.querySelectorAll('.titles a');
  console.log('links:',links);
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
  /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('show articles',articles);
    let html = '';
    for(let article of articles){
        /* get the article id */
        const articleId = article.getAttribute('id');
        /* find the title element */
        /* get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        /* insert link into titleList */
        console.log(linkHTML);
        //titleList.innerHTML = titleList.innerHTML + linkHTML;
        //titleList.insertAdjacentHTML("beforeend",linkHTML);
        html = html + linkHTML;
        console.log(html);
    }
    titleList.innerHTML = html;
}

generateTitleLinks();
}