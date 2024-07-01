/**
 * Parser Class
 * 
 *  Author:     L. Kirstein
 *  Version:    1.0
 *  Date:       19.06.2024
 *  Revision:   -
 *  Revised By: -
 */



/**
 * Hashmap of all possible Patterns and thier RegEx to identify them.
 * The Regular Expressions may be very QnD (Quick n Dirty), further adjustment needed.
 */
expressions = {

    /**
    * Headings 
    */
    "H1":/^#\s+(.*)$/gm,
    "H2":/^##\s+(.*)$/gm, 
    "H3":/^###\s+(.*)$/gm,
    "H4":/^####\s+(.*)$/gm,
    "H5":/^#####\s+(.*)$/gm,
    "H6":/^######\s+(.*)$/gm,



    /**
     * Formatting
     */

    // It is important to parse bold before italics! 
    "Bold" :            /\*\*(.*?)\*\*/g ,
    "Italic" :          /\*(.*?)\*/g     ,
    "Strikethrough" :   /~~(.*?)~~/g     ,

    /**
     * External Content
     * (Links and Images) 
     */
    "Link" :  /\[([^\]]+)\]\(([^)]+)\)/g  ,
    "Image" : /!\[([^\]]+)\]\(([^)]+)\)/g ,



    /**
     * Blocks, Paragraphs, etc.
     */

    "Blockquote" : /^(\>\s)(.*?)(\n)/gm ,
    //"Codeblock":,
    "NewLine" : /\\/g,

    /**
     * Escapings
     */
    "Backslash" : /\\\\/g,
    "Backtick" : /\\\`/g,
    "Asterisk" : /\\\*/g,
    "Underscore" : /\\\_/g,
    "CurlyBracesOpen" : /\\\{/g,
    "CurlyBracesClose" : /\\\}/g,
    "BracketsOpen" : /\\\[/g,
    "BracketsClose" : /\\\]/g,
    "AngleBracketsOpen" : /\\\</g,
    "AngleBracketsClose" : /\\\>/g,
    "ParenthesesOpen" : /\\\(/g,
    "ParenthesesClose" : /\\\)/g,
    "Hashtag" : /\\\#/g,
    "Plus" : /\\\+/g,
    "Minus" : /\\\-/g,
    "Dot" : /\\\./g,
    "ExclamationMark" : /\!/g,
    "Pipe": /\\\|/g
};





/**
 * This function goes throug every step of parsing
 */
function parseMarkdown(input) {
    var result = "";
    
    result = parseHeading(input);
    result = parseBold(result);
    result = parseItalic(result);
    result = parseStrikethrough(result);

    /**
     * Parse Images before Links
     * so that they don't become links with exclamationmarks.
     */
    result = parseImage(result);
    result = parseLink(result);

    result = parseBlockquote(result);
    result = parseParagraph(result);

    // Escapings
    result = parseEscapings(result);

    result = parseNewLine(result);

    return result;
}

/**
 * This function parses Markdown # Headings of all ## sizes into HTML
 */
function parseHeading(input) {
    var result = '';

    result = input.replace(expressions["H6"], '<h6>$1</h6>');
    result = result.replace(expressions["H5"], '<h5>$1</h5>');
    result = result.replace(expressions["H4"], '<h4>$1</h4>');
    result = result.replace(expressions["H3"], '<h3>$1</h3>');
    result = result.replace(expressions["H2"], '<h2>$1</h2>');
    result = result.replace(expressions["H1"], '<h1>$1</h1>');

    return result;
}

/**
 * This function parses Markdown **Bold Text** into HTML
 */
function parseBold(input) {
    return input.replace(expressions["Bold"], '<strong>$1</strong>');
}

/**
 * This function parses Markdown *Italic Text* into HTML
 */
function parseItalic(input) {
    return input.replace(expressions["Italic"], '<em>$1</em>');
}

/**
 * This function parses Markdown ~~Strikethrough Text~~ into HTML
 */
function parseStrikethrough(input) {
    return input.replace(expressions["Strikethrough"], '<del>$1</del>');
}

/**
 * This function parses Markdown-Images into HTML
 */
function parseImage(input) {
    return input.replace(expressions["Image"], '<img src="$2" alt="$1" />');
}

/**
 * This function parses Markdown-Links into HTML
 */
function parseLink(input) {
    return input.replace(expressions["Link"], '<a href="$2">$1</a>');
}

/**
 * This function creates HTML paragraphs out of Markdown content.
 */
function parseParagraph(input) {
    const paragraphRegex = /^(?!<h[1-6]>)(.+)$/gm;
    input = input.replace(paragraphRegex, (match, content) => {
        return `<p>${content}</p>`;
    });

    // Entferne unnötige Paragraphen um Überschriften
    input = input.replace(/<\/p>\s*(<h[1-6]>)/g, '$1');
    input = input.replace(/(<\/h[1-6]>)\s*<p>/g, '$1');

    return input;
}

/**
 * This function creates HTML blockquotes out of the appropriate markdown syntax.
 * Nested blockquotes are supported.
 */
function parseBlockquote(input) {
    console.log(input);
    input.replace(expressions["Blockquote"], '<blockquote>$1</blockquote>');
    console.log(input);
    return input.replace(expressions["Blockquote"], '<blockquote>$2</blockquote>');
}

function parseNewLine(input) {
    return input.replace(expressions["NewLine"], '<br />');
}

function parseEscapings(input) {
    var result = '';

    result = input.replace(expressions["Backslash", "\\"]);
    result = result.replace(expressions["Backtick"], "\`");
    result = result.replace(expressions["Asterisk"], "\*");
    result = result.replace(expressions["Underscore"], "\_");

    result = result.replace(expressions["CurlyBracesOpen"], "\{");
    result = result.replace(expressions["CurlyBracesClose"], "\}");

    result = result.replace(expressions["BracketsOpen"], "\[");
    result = result.replace(expressions["BracketsClose"], "\]");

    result = result.replace(expressions["AngleBracketsOpen"], "\<");
    result = result.replace(expressions["AngleBracketsClose"], "\>");

    result = result.replace(expressions["ParenthesesOpen"], "\(");
    result = result.replace(expressions["ParenthesesClose"], "\)");

    result = result.replace(expressions["Hashtag", "\#"]);
    result = result.replace(expressions["Plus"], "\+");
    result = result.replace(expressions["Minus"], "\-");
    result = result.replace(expressions["Dot"], "\.");
    result = result.replace(expressions["ExclamationMark"], "\!");
    result = result.replace(expressions["Pipe"], "\|");

    return result;
}

