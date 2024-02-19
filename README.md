![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)

# Cerebral Cipher: a logic puzzle game played against the computer

'Cerebral Cipher' is a site that hosts a small logic puzzle game based on the popular physical boardgame 'Mastermind'. 

## REQUIREMENT GATHERING AND PLANNING

Before starting this project, I took some time to think about how to set up, lay out and develop this game. I wrote a few user stories and extracted the user needs from them as well. These needs will also help in my manual testing. 

### User Stories:

As a player
I want a game that is clearly laid out and intuitive
So that I can easily understand how to play it and find all the parts I need

As a player
I want to control my guess input
So that I am not stuck with the first four guesses I put in, should I change my mind

As a player
I want to be given enough chances to make my guess and learn from the feedback
So that the game is satisfying and gives me adequate chance to win, without letting me go on infinitely

As a player
I want to be able to refer to the rules
So that I can look at them at any point during the game to remind myself of anything I've forgotten

As a player
I want to be able to play more than one game
So that I can play the number of games I desire

### User Needs:

- A clear and intuitive lay out
- Controls to amend the existing guesses prior to submission 
- A good number of rounds in each game
- Feedback on my guesses
- A rulebook
- A clear end game phase
- A method of starting a new game

### Wireframes

With my list of requirements, I created two wireframes.

One for the tablet/desktop version. 

One for the mobile version. 

### Colour Palette

The game already has 6 colours for the code that is being guessed, so my colour scheme needed to coordinate with this to some extent. I took some time to pick a colour scheme that I thought was fun and engaging without being too intrusive as there are a lot of components that will be on the page at once. Here is what I chose:

## FEATURES

### Existing Features

#### Computer Choice Indicator

#### Navigation Section

This section contains the 'Rules', 'New Game' and 'About' buttons. 

#### Game Area

#### Controls Panel

#### Rules Information

#### About Information

### Features Left to Implement

#### Dark Mode

#### Hard Mode

#### Endless Guess Mode

## TESTING

I completed the following types of testing throughout development and at the end of my project: 

### Manual Feature Testing

As well as running through the list of user needs and ensuring all the features collectively meet all of the needs, I completed the following manual feature testing: 


| Feature           | Test Case | Outcome | Bugs? |
| ----------------  | -------   | ----    | ----- |

### Browser Compatibility and Screen Size Responsiveness

I viewed the game on each of the three key screen sizes (mobile, tablet and computer), using the devtools, on four of the most popular browsers. I also used the responsive setting to slide the width of the screen from narrow all the way through to wide to check the transition points. 

Pixel references for each of the screen sizes 

|Screen | Pixels |
|-----|-----|
| Mobile - iPhone SE | 375px |
| Tablet - iPad Mini | 768px |
| Computer | 1366px |

| Browser | Screen Size | Appearance | Responsiveness |
|-------|-----|-----|-----|
| Chrome | Mobile |  |  |
| | Tablet |  |  |
| | Computer |  |  |
| | Transition Points |  |  |
| Firefox | Mobile |  |  |
| | Tablet |  |  |
| | Computer |  |  |
| | Transition Points |  |  |
| Safari | Mobile |  |  |
| | Tablet |  |  |
| | Computer |  |  |
| | Transition Points |  |  |
| Edge | Mobile |  |  |
| | Tablet |  |  |
| | Computer |  |  |
| | Transition Points |  |  |

#### Key Responsiveness Differences

The game takes up the whole width of the screen in mobile phone and smaller tablet sizes. The footer is fixed and contains the controls in a row for this size. 

In the larger tablets upwards (including laptops and desktop monitors), the game appears in the centre of the screen and the controls are no longer found in the footer, but in a column alongside the main game area. 

### Code Validation

This was carried out by both link and direct input on the following tools: 
- HTML via [W3C](https://validator.w3.org/)
- CSS via [Jigsaw](https://jigsaw.w3.org/css-validator/)
- JavaScript via [Linter]()

I completed the validation after resolving all my bugs. 

The CSS...

The HTML...

The JavaScript...

### Lighthouse and Accessibility Testing

I used Lighthouse in Chrome Devtools on the single page of my site, using the mobile setting.

After resolving my lighthouse bugs, I reran the report. Here are the new results: 

#### Colour Contrast
I also checked the colour contrast using of my color palette combinations using Coolors: https://coolors.co/contrast-checker/112a46-acc8e5.

#### Alternative Text 

I went through the site systematically, checking that each image had alternative text.

### Resolved Bugs

#### Bug One

**Issue:** The title above the YouTube video is not aligned with the left edge of the video, whereas the title above the image next to the YouTube video is (see image below). This is only on screens larger than a tablet. 

**BEFORE**

![Bug One]()

**Fix:** 

**AFTER**

### Unresolved Bugs

I don't believe I have left any of my bugs unresolved.

## DEPLOYMENT

The site was deployed to GitHub pages. 

The steps to deploy are as follows:
- In the GitHub repository, navigate to the Settings tab
- Under 'Code and automation' in the left hand menu, click on 'Pages'
- Make sure the 'Source' and 'Branch' fields are set to 'Deploy from branch' and 'Main' respectively.
- Click save. 
- If the page does not automatically refresh, manually refresh it and at the top there should be a box that states 'Your site is live at' followed by the URL. 

The live link can be found here:

## CREDITS

### Content
I used this rulebook for the original Mastermind game: https://www.pressmantoy.com/wp-content/uploads/2018/07/3018K10_v1_0218_Mastermind_IM.pdf

### Media

**Favicon**
I got my icon from here: https://www.flaticon.com/free-icon/brain_3286097?term=brain&page=1&position=22&origin=search&related_id=3286097
I generated the code to paste in the head of my HTML file here: https://realfavicongenerator.net/

### Sources of Learning

### General Credit
I want to thank the open source community for the great resources that remind me of what I learnt in my Code Institute lessons, especially https://www.w3schools.com/ and https://developer.mozilla.org/en-US/

I believe I have specifically credited where I used specific items in the previous section but this is a general credit to the reference resources I looked through to remind me how things worked as I went along.  

Every effort has been made to credit everything used but if I find anything else specific later on that needs crediting, that I missed, I will add it. 