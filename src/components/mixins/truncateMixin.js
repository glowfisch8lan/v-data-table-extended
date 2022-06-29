import truncate from "../helpers/truncate";

export default {
    methods: {
        truncate(text, length, clamp) {
            return truncate(text, length, clamp);
        },
    }
}