function Text(language) {
    const textMap = {
      C: [
        "auto", "break", "case", "char", "const", "continue", "default", "do", "double", "else", "enum", "extern", "float", "for", "goto", "if", "int", "long", "register", 
        "return", "short", "signed", "sizeof", "static", "struct", "switch", "typedef", "union", "unsigned", "void", "volatile", "while"
      ],

      Java: [
        "abstract", "boolean", "break", "byte", "case", "catch", "char", "continue", "default", "do", "else", "extends", "false", "finally", "float", "for", "if", "implements", 
        "import", "instanceof", "int", "interface", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", 
        "synchronized", "this", "throw", "true", "try", "void", "while" 
      ],
      
      React: [
        "useState", "useEffect", "props", "state", "component", "render", "return", "onClick", "onChange", "onSubmit", "import", "export", "const", "let", "arrow function",
        "class", "style", "className", "map", "key"
      ],

      Python: [
        "and", "as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "False", "finally", "for", "from", "global", "if",
         "import", "in", "is", "lambda", "None", "nonlocal", "not", "or", "pass", "raise", "return", "True", "try", "while", "with", "yield"
      ],

      HTML: [
        "a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "br", "button", "canvas", "caption", "code", "col",
        "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", 
        "form", "h1", "h2", "h3", "header", "hr", "i", "iframe", "img", "input", "ins", "kbd"
      ],

      CSS: [
        "color", "font-size", "margin", "padding", "background", "display", "position", "width", "height", "border", "text-align", "float",
        "transition", "animation", "flex", "grid", "box-shadow", "hover", "media", "selector"
      ],

      JS: [
        "let", "const", "var", "if", "else", "for", "while", "switch", "function", "return", "array", "object", "string", "number", "boolean",
        "null", "undefined", "typeof", "event", "addEventListener", "querySelector", "querySelectorAll", "innerHTML", "getElementById", "setAttribute",
        "JSON", "fetch", "promise", "async", "await"
      ],

      SQL: [
        "SELECT", "FROM", "WHERE", "JOIN", "INNER", "OUTER", "GROUP BY", "HAVING", "ORDER BY", "INSERT INTO", "UPDATE", "DELETE", "CREATE TABLE",
        "ALTER TABLE", "PRIMARY KEY", "FOREIGN KEY", "INDEX", "NULL", "NOT NULL", "UNIQUE", "DISTINCT", "AND", "OR"
      ],

      PHP: [
        "echo", "if", "else", "for", "while", "switch", "function", "return", "array", "string", "integer", "float", "boolean", "null", "$_GET",
        "$_POST", "$_SESSION", "$_COOKIE", "include", "require", "class", "extends", "public", "private", "protected", "static", "try", "catch", "throw", "mysql", "PDO"
      ],

      Ruby: [
        "puts", "if", "else", "elsif", "unless", "while", "for", "do", "end", "def", "return", "array", "hash", "string", "integer", "float", "nil", "true", "false", "class",
         "module", "require", "include", "attr_accessor", "each", "times", "until", "rescue"
      ],

    };
  
    const randomTexts = textMap[language];
    const randomIndex = Math.floor(Math.random() * randomTexts.length); 
    return randomTexts[randomIndex];
  }
  
  export default Text;

  