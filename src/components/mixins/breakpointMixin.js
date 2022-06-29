export default {
    computed: {
        isNotMobile() {
            return !this.isMobile
        },
        isMobile() {
            return this.breakpoint === 'xs'
        },
        isLaptop() {
            return this.breakpoint === 'md'
        },
        isDesktop() {
            return this.breakpoint === 'lg'
        },
        isLargeDesktop() {
            return this.breakpoint === 'xl'
        },
        breakpoint() {
            return this.$vuetify.breakpoint.name;
        },
    }
}