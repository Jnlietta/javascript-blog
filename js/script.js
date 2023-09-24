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

    const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorsSelector = '.post-author';

const generateTitleLinks = function(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('customSelector:',customSelector);
    console.log('opt+custom:',optArticleSelector + customSelector);
    //console.log('show articles:',articles);
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
        //console.log(linkHTML);
        //titleList.innerHTML = titleList.innerHTML + linkHTML;
        //titleList.insertAdjacentHTML("beforeend",linkHTML);
        html = html + linkHTML;
        //console.log(html);
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    //console.log('links:',links);
    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

const generateTags = function(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector); 
    //console.log('articles generateTags:',articles);
    /* START LOOP: for every article: */
    for (let article of articles){
        /* find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
        //console.log('tags wrapper:',tagsWrapper);
        /* make html variable with empty string */
        let html = '';
        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        //console.log('article tags:',articleTags);
        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        //console.log(articleTagsArray);
        /* START LOOP: for each tag */
        for (let tag of articleTagsArray){
            //console.log('separate tag:',tag);
            /* generate HTML of the link */
            const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
            /* add generated code to html variable */
            html = html + linkHTML;
            //console.log(html);
        /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
        tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
}
  
generateTags();

const tagClickHandler = function(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('const href:',href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    //const tag = document.querySelector(href);
    const tag = href.replace('#tag-', '');
    console.log('tag:',tag);
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for( let activeTagLink of activeTagLinks){
      /* remove class active */
      activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let hrefTagLink of hrefTagLinks){
      /* add class active */
      hrefTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}
  
const addClickListenersToTags = function(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for(let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click',tagClickHandler);
    /* END LOOP: for each link */
    }
}
  
  addClickListenersToTags();

//Wyświetl autora jako link we wraperze .post-author
const generateAuthors = function(){
    /*Find all articles*/
    const articles = document.querySelectorAll(optArticleSelector);
    /*start loop: for every article:*/
    for(let article of articles){
        /*find author wrapper*/
        const authorWrapper = article.querySelector(optArticleAuthorsSelector);
        //console.log('authorWrapper:',authorWrapper);
        /*make html variable with empty string*/
        let html = '';
        /*get author from data-author attribute*/
        const articleAuthor = article.getAttribute('data-author');
        //console.log('articleAuthor:',articleAuthor);
        /*generate html of the link*/
        const linkHTML = 'by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
        //console.log(linkHTML);
        /*add generated code to html variable*/
        html = html + linkHTML;
        //console.log('html:',html);
        /*insert html of all the links into the author wrapper*/
        authorWrapper.innerHTML = html;
    /*end loop: for every article*/
    }
}

generateAuthors();

const authorClickHandler = function (event){
    /*prevent default action for this event */
    event.preventDefault();
    /*make new constant named "clickedElement" and give it the value of "this"*/
    const clickedElement = this;
    /*make a new constant "href" and read the attribute "herf" of the clicked element*/
    const href = clickedElement.getAttribute('href');
    /*make a new constant "author" and extract tag from the "href" constant*/
    const author = href.replace('#author-','');
    /*find all author links with class active*/
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /*start loop: for each active author link*/
    for(let activeAuthorLink of activeAuthorLinks){
        /*remove class active*/
        activeAuthorLink.classList.remove('active');
        /*end loop: for each active author link*/
    }
    /*find all author links with "href" attribute eual to the "href" constant*/
    const hrefAuthorLinks = document.querySelectorAll(href);
    /*start loop: for each found author link*/
    for(let hrefAuthorLink of hrefAuthorLinks){
        /*add class active*/
        hrefAuthorLink.classList.add('active');
    /*end loop: for each found author link */
    }
    /*execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
}

const addClickListenersToAuthors = function() {
    /*find all links to authors*/
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    /*start loop: for each link*/
    for(let authorLink of authorLinks){
        /*add authorClickHandler as event listener for that link*/
       authorLink.addEventListener('click',authorClickHandler);
    /*end loop: for each link*/
    }
}

addClickListenersToAuthors();

}
