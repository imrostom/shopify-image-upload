import { Form, useSubmit } from "@remix-run/react";

import {
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/node";


export async function action({ params, request }) {

  const uploadHandler = composeUploadHandlers(
    createFileUploadHandler({
      directory: "public/uploads",
      maxPartSize: 300000000,
    }),
    createMemoryUploadHandler(),
  );
  const formData = await parseMultipartFormData(request, uploadHandler);

  const image = formData.get("image");
  console.log(image)
  if (!image || typeof image === "string") {
    return json({ error: "something wrong", imgSrc: null });
  }


  return json({ status: false, message: "Please provide valid user data." });
}

export default function Index() {
  const submit = useSubmit();

  const handleFileUpload = (e) => {
    console.log(e.currentTarget.files);
    const formData = new FormData();
    formData.append("image", e.currentTarget.files[0]);
    submit(formData, { method: "post", encType: "multipart/form-data" });

    // console.log(formData.get('image'));

  }

  return (
    <div className="container">
      <div className="MainArea">
        <div className="row">
          <div className="contact-form">
            <Form method="post" encType="multipart/form-data">
              <input type="file" name="image" id="image" onChange={handleFileUpload} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
