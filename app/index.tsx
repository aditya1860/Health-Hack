import { ExpoRoot } from 'expo-router';

export default function Root() {
  return <ExpoRoot context={require.context('.', true, /\.[jt]sx?$/)} />;
}
