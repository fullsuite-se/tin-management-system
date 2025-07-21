export const messages = {
    // 200 //
    entryFound: {
        status: 200,
        title: "Entry Found",
        message: "Looks like we found that entry. Here's what we have:"
    },
    entriesFound: {
        status: 200,
        title: "Entries Found",
        message: "Looks like we found some entries. Here's what we have:"
    },
    entryAdded: {
        status: 200,
        title: "Entry Added",
        message: "Your entry was successfully added, cheers!"
    },
    entryEdited: {
        status: 200,
        title: "Entry Edited",
        message: "Your entry was successfully edited, cheers!"
    },
    entryDeleted: {
        status: 200,
        title: "Entry Deleted",
        message: "Your entry was successfully deleted, cheers!"
    },
    entriesExported: {
        status: 200,
        title: "Entries Exported",
        message: "Entries were successfully exported, cheers!"
    },

    // 400 //
    duplicateTIN: {
        status: 400,
        title: "Duplicate TIN",
        message: "Looks like that TIN's already taken. Mind double-checking?"
    },
    requestNotSent: {
        status: 400,
        title: "Request Not Sent",
        message: "It seems we didn't receive any entry. Please try again."
    },
    invalidOrIncompleteData: {
        status: 400,
        title: "Invalid or Incomplete Data",
        message: "Looks like the entry we received was incomplete or invalid. Please try again."
    },
    invalidSheetUrl: {
        status: 400,
        title: "Invalid Sheet URL",
        message: "Hmm... that doesn't look like a valid Google Sheets URL. Please try again."
    },

    // 403 //
    sheetPermissionDenied: {
        status: 403,
        title: "Permission Denied",
        message: "Oops! Please share your sheet with our expert bot:\n" +
            "fs-tin-export-bot@tin-management-system.iam.gserviceaccount.com"
    },

    // 404 //
    entryNotFound: {
        status: 404,
        title: "Entry Not Found",
        message: "Looks like we couldn't find that entry. Please try again."
    },
    entriesNotFound: {
        status: 404,
        title: "Entries Not Found",
        message: "Looks like we couldn't find any entries. Please try again."
    },

    // 405 //
    methodNotAllowed: {
        status: 405,
        title: "Wrong Move!",
        message: "This action isn't allowed here. Try refreshing the page. If the issue persists, let us know!"
    },

    // 500 //
    serverError: (error: string) => ({
        status: 500,
        title: "Something Went Wrong",
        message: "An unexpected error occurred on our end. We're working to resolve it. Please try again later. If the issue persists, let us know!",
        error: error
    }),
}