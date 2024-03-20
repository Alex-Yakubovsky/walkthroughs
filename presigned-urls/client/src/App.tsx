import { useState } from "react";

function App() {
  const [publicUrl, setPublicUrl] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const resp = await fetch("http://localhost:3000/signed-urls", {
          method: "POST",
        });

        const { signedUrl, publicUrl } = await resp.json();

        const formData = new FormData(form);
        const file = formData.get("file") as File;

        await fetch(signedUrl, {
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
