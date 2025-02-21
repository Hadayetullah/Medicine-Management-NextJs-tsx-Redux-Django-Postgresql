export default function TestEnvPage() {
  return (
    <div className="mt-[100px] text-center">
      <p>API Base URL: {process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}</p>
      <p>Socket Base URL: {process.env.NEXT_PUBLIC_BACKEND_SOCKET_BASE_URL}</p>
      <p>Socket Base URL: {process.env.NEXT_PUBLIC_NODE_ENV}</p>
    </div>
  );
}
