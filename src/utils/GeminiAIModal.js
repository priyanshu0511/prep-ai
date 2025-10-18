export async function fetchAIResponse(prompt) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  console.log(data);
  if (res.ok) return data.text;
  throw new Error(data.error || "Failed to fetch AI response");
}
