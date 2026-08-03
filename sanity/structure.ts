import type { StructureResolver } from "sanity/structure";
import { 
  Settings, 
  FileText, 
  HelpCircle, 
  Image as ImageIcon
} from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Pages List
      S.listItem()
        .title("Pages")
        .icon(FileText)
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Homepage")
                .child(
                  S.document()
                    .schemaType("page")
                    .documentId("home")
                    .title("Homepage")
                ),
              S.listItem()
                .title("About Page")
                .child(
                  S.document()
                    .schemaType("aboutPage")
                    .documentId("aboutPage")
                    .title("About Page")
                ),
              S.listItem()
                .title("Contact Page")
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                    .title("Contact Page")
                ),
              S.listItem()
                .title("Residences Page")
                .child(
                  S.document()
                    .schemaType("residencesPage")
                    .documentId("residencesPage")
                    .title("Residences Page")
                ),
              S.listItem()
                .title("Location Page")
                .child(
                  S.document()
                    .schemaType("locationPage")
                    .documentId("locationPage")
                    .title("Location Page")
                ),
              S.listItem()
                .title("Gallery Page")
                .child(
                  S.document()
                    .schemaType("galleryPage")
                    .documentId("galleryPage")
                    .title("Gallery Page")
                )
            ])
        ),

      S.divider(),

      // Core Content Lists
      S.documentTypeListItem("faq").title("FAQs").icon(HelpCircle),
      S.documentTypeListItem("galleryItem").title("Gallery Images").icon(ImageIcon),

      S.divider(),

      S.listItem()
        .title("Site Settings")
        .icon(Settings)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),
      S.listItem()
        .title("Header Settings")
        .icon(Settings)
        .child(
          S.document()
            .schemaType("headerSettings")
            .documentId("headerSettings")
            .title("Header Settings")
        ),
      S.listItem()
        .title("Footer Settings")
        .icon(Settings)
        .child(
          S.document()
            .schemaType("footerSettings")
            .documentId("footerSettings")
            .title("Footer Settings")
        ),

      // Hide default lists of singletons from the root list
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "page",
            "aboutPage",
            "contactPage",
            "residencesPage",
            "locationPage",
            "galleryPage",
            "faq",
            "galleryItem",
            "siteSettings",
            "footerSettings",
            "headerSettings"
          ].includes(listItem.getId() || "")
      ),
    ]);
