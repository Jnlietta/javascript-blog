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
    optArticleAuthorsSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors.list';

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

const calculateTagsParams = function (tags) {
    /* define new constance params as an object*/
    const params = {
        max: 0,
        min: 999999,
    }
    /*START LOOP: for each tag*/
    for(let tag in tags){
        /* check if tag[tag] is bigger than params.max */
        if(tags[tag] > params.max){
            params.max = tags[tag];
          }
        /* check if tag[tag] is smaller than params.max */
        if(tags[tag] < params.min){
            params.min = tags[tag];
          }
        console.log(tag + ' is used ' + tags[tag] + ' times');
    /*END LOOP: for each tag*/
      }
    return params;
}

const calculateTagClass = function (count, params) {
    
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    console.log('classNumber',classNumber);
    const cloudClassPrefix = optCloudClassPrefix + classNumber;
    console.log('cloudClassPrefix: ',cloudClassPrefix);
    return cloudClassPrefix;
}

const generateTags = function(){
    /* create a new variable allTags with an empty object */
    let allTags = {};
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
            /* check if this link is NOT already in allTags */
            //if(allTags.indexOf(linkHTML) == -1){ //tablica
            if(!allTags[tag]) { //obiekt
                /* [NEW] add generated code to allTags array */
                //allTags.push(linkHTML); //tablica
                allTags[tag] = 1; //obiekt
            } else {
                allTags[tag]++;
            }
        /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
        tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

                /* [NEW] add html from allTags to tagList */
                //tagList.innerHTML = allTags.join(' ');
                ////console.log('allTags:',allTags);
    
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
        /* [NEW] generate code of a link and add it to allTagsHTML */
        //<li><a href="#">design</a> <span>(6)</span></li>
        const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
        console.log('tagLinkHTML:', tagLinkHTML);
        allTagsHTML += '<li><a href="#tag-' + tag + '" class="'+ tagLinkHTML +'">' + tag + '</a></li>';
        //allTagsHTML += tagLinkHTML; ????????????
        console.log('allTagsHTML:', allTagsHTML);
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
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

  /*const calculateAuthorsParams = function (authors) {
    /* define new constance params as an object
    const params = {
        max: 0,
        min: 999999,
    }
    /*START LOOP: for each tag
    for(let author in authors){
        /* check if tag[tag] is bigger than params.max 
        if(authors[author] > params.max){
            params.max = authors[author];
          }
        /* check if tag[tag] is smaller than params.max 
        if(authors[author] < params.min){
            params.min = authors[author];
          }
        console.log(author + ' is used ' + authors[author] + ' times');
    /*END LOOP: for each tag
      }
    return params;
}*/

/*const calculateAuthorClass = function (count, params) {
    
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    console.log('classNumber',classNumber);
    const cloudClassPrefix = optCloudClassPrefix + classNumber;
    console.log('cloudClassPrefix: ',cloudClassPrefix);
    return cloudClassPrefix;
}*/


//Wyświetl autora jako link we wraperze .post-author
const generateAuthors = function(){
    /* create a new variable allAuthors with an empty object */
    let allAuthors = {};
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
        /* [NEW] check if this link is NOT already in allAuthors */
        if(!allAuthors[articleAuthor]) {
            /* [NEW] add tag to allAuthors object */
            allAuthors[articleAuthor] = 1;
            } else {
                allAuthors[articleAuthor]++;
            }
        /*insert html of all the links into the author wrapper*/
        authorWrapper.innerHTML = html;
    /*end loop: for every article*/
    }
    /* [NEW] find list of authors in right column */
    const authorsList = document.querySelector(optAuthorsListSelector);

                /* [NEW] add html from allTags to tagList */
                //authorsList.innerHTML = allTags.join(' ');
                //console.log('allAuthors:',allAuthors);
    
    /* [NEW] create variable for all links HTML code */
    /*const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams:', authorsParams);*/
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let author in allAuthors){
        /* [NEW] generate code of a link and add it to allTagsHTML */
        //<li><a href="#">design</a> <span>(6)</span></li>
        allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '</a><span>(' + allAuthors[author] + ') </span></li>';
        console.log('allAuthorsHTML:',allAuthorsHTML)
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    authorsList.innerHTML = allAuthorsHTML;
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
    /*find all author links with "href" attribute equal to the "href" constant*/
    const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
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
