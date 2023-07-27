import { loremIpsum } from "lorem-ipsum";

const mockData = Array.from({ length: 30 }, (v, i) => ({
    name: `foo${i + 1}`,
    value: loremIpsum({ count: Math.floor(Math.random() * 10) + 1, units: 'sentences' }),
}));

export { mockData };