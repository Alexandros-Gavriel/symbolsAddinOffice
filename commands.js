/* global Word, Office */

// Office onReady event
Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    // Initialization code if needed
  }
});

// Function to insert a section break at the end of the document
async function insertSectionBreakDocumentEnd(event) {
  try {
    await Word.run(async (context) => {
      // Insert a section break at the end of the document
      context.document.body.insertBreak(Word.BreakType.sectionNext, Word.InsertLocation.end);
      await context.sync();
    });
    event.completed(); // Mark the event as completed
  } catch (error) {
    console.log("Error inserting section break at document end: " + error);
    event.completed(); // Ensure the event is completed even if there's an error
  }
}

// Function to insert a section break at the cursor position
async function insertSectionBreakAtCursor(event) {
  try {
    await Word.run(async (context) => {
      const selection = context.document.getSelection();
      selection.insertBreak(Word.BreakType.sectionNext, Word.InsertLocation.after);
      await context.sync();
    });
    event.completed(); // Mark the event as completed
  } catch (error) {
    console.log("Error inserting section break at cursor: " + error);
    event.completed(); // Ensure the event is completed even if there's an error
  }
}

// Associate the functions with the names used in the manifest
Office.actions.associate("button1Function", insertSectionBreakAtCursor);
Office.actions.associate("button2Function", insertSectionBreakDocumentEnd);
