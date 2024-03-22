import { useState } from "react";

function App() {
  const [publicUrl, setPublicUrl] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const file = formData.get("file") as File;

        const resp = await fetch("http://localhost:3000/presigned-urls", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contentLength: file.size,
          }),
        });

        const { presignedUrl, publicUrl } = await resp.json();

        await fetch(presignedUrl, {
          method: "PUT",
          body: file,
        });

        setPublicUrl(publicUrl);
        form.reset();
      }}
    >
      <h2>Share an image!</h2>
      <input type="file" accept="image/*" name="file" />
      <button>Submit</button>
      {publicUrl && (
        <p>
          File upload complete. You can access the file <a href={publicUrl}>here</a>
        </p>
      )}
    </form>
  );
}

export default App;
