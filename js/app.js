//app.js

// to do:

/*
 
-Add twitter api to get info from 
-Add google translate api to translate quote
*/

$(document).ready(function(){
    //create random text generation in quote area
    var randomTitle = "Click...What?";
    // changes back to title;
    var randomTitleChanged = "";

    //Set to Title
    $(".random-language").text(randomTitle);

    //Get html color for future manipulation
    var $html = $("html");
    var orginalRed = rgbaGrab($html).red;
    var orginalGreen = rgbaGrab($html).green;
    var orginalBlue = rgbaGrab($html).blue;
    var orginalAlpha = rgbaGrab($html).alpha;


    /*Random Language*/
    // create language object constructor function-
    function Language(startLang, endLang, langName){
        this.startLang = startLang;
        this.endLang = endLang;
        this.langName = langName;
    }

    // easter egg!!!
    // function for random language pick-
    function randomLanguage(){
        var languageArray = [];

        // add language with ranges
        var latin = new Language(0x0021, 0x007E, "latin");
        var arabic = new Language(0x060C,0x06FE,"arabic");
        var thai = new Language(0x0E01, 0x0E5B, "thai");
        var korean = new Language(0x1100, 0x11F9, "korean");

        
        languageArray.push(latin);
        languageArray.push(arabic);
        languageArray.push(thai);
        languageArray.push(korean);
        
        // picks random language and keep consistant set of UTF characters
        var randomPickStart = Math.floor(Math.random() * languageArray.length);
        var randomPickEnd = randomPickStart;
        
        // console.log("randomPickStart: " + randomPickStart,"randomPickEnd: " + randomPickEnd);
        
        return {
            startLang: languageArray[0].startLang,
            endLang: languageArray[0].endLang
        };
    }

    /*Random Color*/
 
    /* Background Color Change */
    function rgbaGrab(element){
        var rgb = element.css('background-color');
        var rgbArray = rgb.replace(/^(rgb|rgba)\(/,'').replace(/\)$/,'').replace(/\s/g,'').split(',');
        var red =  parseInt(rgbArray[0]);
        var green =  parseInt(rgbArray[1]);
        var blue =  parseInt(rgbArray[2]);
        var alpha = parseInt(element.css("opacity"));

        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha
        };
    }

    function colorChange(color){
        var randomColorValue = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
        var randomNumber = Math.floor(Math.random() * 10) + 1;
        
        if (randomNumber <= 5){
            color = color + randomColorValue;
        }
        
        if (randomNumber > 5){
            color = color - randomColorValue;
        }
        
        if(color < 0 || color > 255){
            return colorChange(color);
        } else{
            return color; 
        }
    }

    // to revert back to color
    function colorRevert(originalColor, randomColor){
        var differenceColor;
        if(originalColor === randomColor){
            return originalColor;
        } else if (originalColor > randomColor){
            randomColor = randomColor + 1;
            return  randomColor;
        } else {
            randomColor = randomColor - 1;
            return randomColor;
        }     
        // this would be much more efficent if I can use the closet set of two primes 
        // between 0 and 255.
    }

    // it works but its too buggy, fix the hack
    function alphaChange(opacity){
        opacity = 0.99;
        var randomOpacity = 0;
        var randomNumber = 0;
        for(var i = 0; i < 10; i++){
            // 0.01 or 0
            randomOpacity = (Math.round(Math.random() * 1)/1)/100;
            randomNumber = Math.floor(Math.random() * 10) + 1;
            console.log("randomNumber:" + randomOpacity);
        }
        
        if (randomNumber > 5){
            opacity = opacity + randomOpacity;
        }
        
        if (randomNumber <= 5){
            opacity = opacity - randomOpacity;
        }
        
        return opacity;
    }

    function alphaRevert(orginalOpacity, randomOpacity){
        if(orginalOpacity === randomOpacity){
            return orginalOpacity;
        } else if (orginalOpacity > randomOpacity){
            randomOpacity = randomOpacity + 0.01;
            return randomOpacity;
        } else {
            randomOpacity = randomOpacity - 0.01;
            return randomOpacity;
        } 
    }

    /*Random Text*/
    function toArray(string){
        var array = string.split("");
        return array;
    }

    function randomPosition(array){
        var jumpArrayPosition = Math.floor(Math.random() * array.length);
        return jumpArrayPosition;
    }

    // changes leter to random string
    function randomText(starter, ender, array){
        var arrayOriginal  = array;
        // get random postion of element
        var jumpArrayPosition = randomPosition(array);
        
        // generate random character
        var text = String.fromCharCode(starter + Math.random() * (ender-starter+1));

        // assign random character to random position
        arrayOriginal[jumpArrayPosition] = text;
        randomTitleChanged = arrayOriginal.join('');
        return randomTitleChanged;
    }

    function returnToTitle(stringInput){
        var stringOutput = "";
        var array = toArray(stringInput);
        var titleArray = randomTitle.split('');
        var jumpArrayPosition = randomPosition(array);
        
        array[jumpArrayPosition] = titleArray[jumpArrayPosition];
        stringOutput = array.join("");
        
        // assigns output randomTitleChanged
        randomTitleChanged = stringOutput;

        return randomTitleChanged;

    }

    /* audio */
    var selectAudio = new Howl({
        urls: ['audio/pickup-coin-audio-1.ogg'],
        volume: 0.2
    });

    var hoverAudio = new Howl({
        urls: ['audio/Le-Moulin-Yann_Tiersen.ogg']
    });


    var titleArray = toArray(randomTitle);

    /* video */
    // using vide.js? 

   

    /* loop code to get things working */

    // needs to be in outer scope to work
    var randomIntervalSet;
    var randomIntervalSetColor;
    var backToOriginalInterval;
    var backToOriginalIntervalColor;

    // future fix, pass in parameters to change. later.
    // that way any text or element can be randomized.
    function startCycle(){ 
        randomIntervalSet = setInterval(function(){
            // works by getting the new value on every call back.
            //text
            $(".random-language").text(randomText(randomLanguage().startLang, randomLanguage().endLang, titleArray));
            randomTitleChanged = $(".random-language").text();
                      
        }, 150);
    }

    function startCycleColor(){
        randomIntervalSetColor = setInterval(function(){

            //color
            $html.css("background-color","rgba("+colorChange(rgbaGrab($html).red)+","
                                                +colorChange(rgbaGrab($html).green)+","
                                                +colorChange(rgbaGrab($html).blue)+","
                                                +alphaChange(rgbaGrab($html).alpha)+")");  
        }, 100);
    }

    function endCycle(){
        clearInterval(randomIntervalSet);
    }

    function endCycleColor(){
        clearInterval(randomIntervalSetColor);
    }

    function backToOriginal(){
        backToOriginalInterval = setInterval(function(){
            $(".random-language").text(returnToTitle(randomTitleChanged));
        }, 75);
    }

    function backToOriginalColor(){
        backToOriginalIntervalColor = setInterval(function(){
            $html.css("background-color","rgba("+colorRevert(orginalRed, rgbaGrab($html).red)+","
                                                +colorRevert(orginalGreen, rgbaGrab($html).green)+","
                                                +colorRevert(orginalBlue, rgbaGrab($html).blue)+","
                                                +alphaRevert(orginalAlpha, rgbaGrab($html).alpha)+")");  
        }, 25);
    }

    function endCycleBackToOriginal(){
        clearInterval(backToOriginalInterval);
    }

    function endCycleBackToOrginalColor(){
        clearInterval(backToOriginalIntervalColor);
    }

    /* Data section 
       Should be divided, but its a single page app, so no big deal*/
    function quoteGenerator(){
        var quotesArray = [
                            "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
                            "The important thing is not to stop questioning. Curiosity has its own reason for existing.", 
                            "A Leader is a dealer in hope", 
                            "Strive not to be a success, but rather to be of value.",
                            "I attribute my success to this: I never gave or took any excuse.",
                            "The most difficult thing is the decision to act, the rest is merely tenacity.",
                            "We become what we think about.",
                            "Life is what happens to you while you’re busy making other plans.",
                            "Definiteness of purpose is the starting point of all achievement.",
                            "The mind is everything. What you think you become.",
                            "The best time to plant a tree was 20 years ago. The second best time is now.",
                            "I am not a product of my circumstances. I am a product of my decisions.",
                            "Your time is limited, so don’t waste it living someone else’s life.",
                            "People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily",
                            "Life shrinks or expands in proportion to one’s courage.",
                            "The best revenge is massive success.",
                            "Whatever you can do, or dream you can, begin it.  Boldness has genius, power and magic in it.",
                            "I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
                            "Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.",
                            "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.",
                            "The only person you are destined to become is the person you decide to be.",
                            "Everything you’ve ever wanted is on the other side of fear.",
                            "Teach thy tongue to say, “I do not know,” and thous shalt progress.",
                            "Fall seven times and stand up eight.",
                            "Happiness is not something readymade.  It comes from your own actions.",
                            "First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.",
                            "We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.",
                            "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
                            "If you want to lift yourself up, lift up someone else.",
                            "What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.",
                            "A person who never made a mistake never tried anything new.",
                            "It is never too late to be what you might have been",
                            "A truly rich man is one whose children run into his arms when his hands are empty.",
                            "Build your own dreams, or someone else will hire you to build theirs.",
                            "It does not matter how slowly you go as long as you do not stop.",
                            "I have learned over the years that when one’s mind is made up, this diminishes fear.",
                            "Education costs money.  But then so does ignorance.",
                            "It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings.",
                            "Our lives begin to end the day we become silent about things that matter",
                            "Remember no one can make you feel inferior without your consent",
                            "Either write something worth reading or do something worth writing.",
                            "Change your thoughts and you change your world"
                            ];

        var authorArray = [
                            "Albert Einstein",
                            "Albert Einstein",
                            "Napoleon Bonaparte",
                            "Albert Einstein",
                            "Florence Nightingale",
                            "Amelia Earhart",
                            "Earl Nightingale",
                            "John Lennon",
                            "W. Clement Stone",
                            "Buddha",
                            "Chinese Proverb",
                            "Stephen Covey",
                            "Steve Jobs",
                            "Zig Ziglar",
                            "Anais Nin",
                            "Frank Sinatra",
                            "Johann Wolfgang von Goethe",
                            "Maya Angelou",
                            "Jesus",
                            "Aristotle",
                            "Ralph Waldo Emerson",
                            "George Addair",
                            "Maimonides",
                            "Japanese Proverb",
                            "Dalhi Lama",
                            "Aristotle",
                            "Marie Curie",
                            "Joshua J. Marine",
                            "Booker T. Washington",
                            "Bob Dylan",
                            "Albert Einstein",
                            "George Eliot",
                            "Unknown",
                            "Farrah Gray",
                            "Confucius",
                            "Rosa Parks",
                            "Sir Claus Moser",
                            "Ann Landers",
                            "Martin Luther King Jr.",
                            "Eleanor Roosevelt",
                            "Benjamin Franklin",
                            "Norman Vincent Peale"
                            ];

        var randomQuotePosition = randomPosition(quotesArray);
        var position = randomQuotePosition;

        var outputQuote = quotesArray[position];
        var outputAuthor = authorArray[position];

        return {
            outputQuote : outputQuote,
            outputAuthor : outputAuthor  
    };
}

    /* tweet quote*/
    var tweetButton = "<i class='fa fa-twitter'></i>";

    
    function tweetLengthManage(quote, author){
        // eliminate bug with semi colon(;), replace with (:)
        quote = quote.replace(";",":");

        var quoteTotal = quote + " " + author;
        var userName = " via @tesla809";
        var quoteOutput = "\"" + quote + "\"" + "-" + author;
        
      
        if (quoteTotal.length + userName.length < 141){
            return quoteOutput;

        } else{
            var quoteShortenLength = quoteOutput.length - quote.length - userName.length - "...".length;
            var quoteModShort = 140 - quoteShortenLength;
            console.log(140 - quoteShortenLength + " characters left");
            quote = quote.substring(0, quoteModShort) + "...";
            
            return "\"" + quote + "\"" + "-" + author;
           
        }
    }
    

    /*** User Interaction ***/
    var spinner = "<i class='fa fa-cog fa-spin fa-2x'></i>";

    // add tweet button for first quote
    var beginQuote = $(".add-Quote").text();
    var beginAuthor = $(".add-Author").text();

    $(".add-Author").append(" <a href='http://twitter.com/home/?status="+tweetLengthManage(beginQuote,beginAuthor)+" via @tesla809'>"+tweetButton+"</a>");


    // changes random text every second.
    $(".random-language").mouseenter(function(){
        startCycle();
        startCycleColor();
        endCycleBackToOriginal();
        endCycleBackToOrginalColor();
        hoverAudio.play();

        $(".quote-space").append(spinner);
        

    }).mouseleave(function(){
        endCycle();
        endCycleColor();
        backToOriginal();
        backToOriginalColor();
        hoverAudio.pause();

        $("i").remove(':last');
    });

    $(".random-language").on("click", function(){
        var quoteOutput = quoteGenerator();
        $(".add-Quote").text(quoteOutput.outputQuote);
        $(".add-Author").text(quoteOutput.outputAuthor);
        selectAudio.play();

        /* tweet */
        var tweetLink = " <a href='http://twitter.com/home/?status="+tweetLengthManage(quoteOutput.outputQuote,quoteOutput.outputAuthor)+" via @tesla809'>"+tweetButton+"</a>";
        $(".add-Author").append(tweetLink);
    });

});