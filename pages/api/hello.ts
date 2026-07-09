type Data = {
  name: string;
};

export default function handler(
  _req: unknown,
  res: { status: (code: number) => { json: (body: Data) => void } },
) {
  res.status(200).json({ name: "John Doe" });
}
