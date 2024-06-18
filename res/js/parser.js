/**
 * (Hopefully) Simple One-File Markdown Parser
 */


//
// Define All Markdown Elements
//

// Paragraph
const Paragraph = /^[A-Za-z\*].*(?:\n[A-Za-z\*].*)*/gm;
// Blockquote
const Blockquote = /(?<=\n\n)(>)(.*?)(?=\n\n)/gms;

// Heading 1 - Text behind one of '#'
const H1 = /(?<!#)#([^\#\n]+)/g;
// Heading 2 - Text behind two of '#'
const H2 = /(?<!#)##([^\#\n]+)/g;
// Heading 3 - Text behind three of '#'
const H3 = /(?<!#)###([^\#\n]+)/g;
// Heading 4 - Text behind four of '#'
const H4 = /(?<!#)####([^\#\n]+)/g;
// Heading 5 - Text behind five of '#'
const H5 = /(?<!#)#####([^\#\n]+)/g;
// Heading 6 - Text behind six of '#'
const H6 = /(?<!#)######([^\#\n]+)/g;

// Image - Convert Before Links!
const Image = /!\[(.*?)\]\((.*?)\)/g;
// Hyperlink
const Hyperlink = /\[(.*?)\]\((.*?)\)/g;

// Bold Text - Text with ** two ** stars at start and end.
const Bold = /(?!\\\*)\*{2}([^*]+)\*{2}/g;
// Italic Text - Text with * one * star at start and end.
const Italic = /(?!\\\*)\*{1}([^*]+)\*{1}/g;
// Italic & Bold Text - Text with *** three *** star at start and end.
const ItalicBold = /(?!\\\*)\*{3}([^*]+)\*{3}/g;

//Escapings
// New Line
const NewLine = /\\/g;
//Asterisk
const Asterisk = /\\\*/g;
//Backslash
const Backslash = /\\\\/g;
//Backtick
const Backtick = /\\\`/g;
//Underscore
const Underscore = /\\\_/g;
//Hashtag
const Hashtag = /\\\#/g;
// Dot
const Dot = /\\\./g;
// Exclamation Mark
const ExclamationMark = /\\\!/g;
// Minus
const Minus = /\\\-/g;
// Plus
const Plus = /\\\+/g;

//Braces, Brackets, Parentheses
const CurlyBracesOpen = /\\\{/g;
const CurlyBracesClose = /\\\}/g;

const SquareBracketsOpen = /\\\[/g;
const SquareBracketsClose = /\\\]/g;

const ParenthesesOpen = /\\\(/g;
const ParenthesesClose = /\\\)/g;

function convertMarkdownToHtml(MarkdownInput) {

    let HtmlOutput = "";



    HtmlOutput = MarkdownInput.replace(Backslash, (match, p1) => `\\`);
    HtmlOutput = HtmlOutput.replace(Asterisk, (match, p1) => `\*`);
    HtmlOutput = HtmlOutput.replace(Backtick, (match, p1) => `\``);
    HtmlOutput = HtmlOutput.replace(Underscore, (match, p1) => `\_`);
    HtmlOutput = HtmlOutput.replace(Hashtag, (match, p1) => `\#`);
    HtmlOutput = HtmlOutput.replace(Dot, (match, p1) => `\.`);
    HtmlOutput = HtmlOutput.replace(ExclamationMark, (match, p1) => `\!`);
    HtmlOutput = HtmlOutput.replace(Minus, (match, p1) => `\-`);
    HtmlOutput = HtmlOutput.replace(Plus, (match, p1) => `\+`);
    HtmlOutput = HtmlOutput.replace(CurlyBracesOpen, (match, p1) => `\{`);
    HtmlOutput = HtmlOutput.replace(CurlyBracesClose, (match, p1) => `\}`);
    HtmlOutput = HtmlOutput.replace(SquareBracketsOpen, (match, p1) => `\[`);
    HtmlOutput = HtmlOutput.replace(SquareBracketsClose, (match, p1) => `\]`);
    HtmlOutput = HtmlOutput.replace(ParenthesesOpen, (match, p1) => `\(`);
    HtmlOutput = HtmlOutput.replace(ParenthesesClose, (match, p1) => `\)`);

    HtmlOutput = HtmlOutput.replace(NewLine, (match, p1) => `<br />`);

    HtmlOutput = HtmlOutput.replace(H6, (match, p1) => `<h6>${p1}</h6>`);
    HtmlOutput = HtmlOutput.replace(H5, (match, p1) => `<h5>${p1}</h5>`);
    HtmlOutput = HtmlOutput.replace(H4, (match, p1) => `<h4>${p1}</h4>`);
    HtmlOutput = HtmlOutput.replace(H3, (match, p1) => `<h3>${p1}</h3>`);
    HtmlOutput = HtmlOutput.replace(H2, (match, p1) => `<h2>${p1}</h2>`);
    HtmlOutput = HtmlOutput.replace(H1, (match, p1) => `<h1>${p1}</h1>`);
  
    HtmlOutput = HtmlOutput.replace(Image, (match, p1, p2) => `<img src="${p2}" alt="${p1}"></img>`);
    HtmlOutput = HtmlOutput.replace(Hyperlink, (match, p1, p2) => `<a href="${p2}">${p1}</a>`);
    
   // HtmlOutput = HtmlOutput.replace(Blockquote, (match, p1, p2) => `<blockquote><p>${p2}</p></blockquote>`);
    // HtmlOutput = HtmlOutput.replace(Paragraph, (match) => `<p>${match}</p>`);

    HtmlOutput = HtmlOutput.replace(ItalicBold, (match, p1) => `<i><b>${p1}</b></i>`);
    HtmlOutput = HtmlOutput.replace(Bold, (match, p1) => `<b>${p1}</b>`);
    HtmlOutput = HtmlOutput.replace(Italic, (match, p1) => `<i>${p1}</i>`);


    return HtmlOutput;
}
