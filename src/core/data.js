export async function loadSiteData(path = "data/content.json") {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Failed to load site data: ${response.status}`);
    }
    return response.json();
}
