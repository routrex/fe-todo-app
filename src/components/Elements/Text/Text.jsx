const Text = (props) => {
    const {children, variant = "body", classname = " "} = props
    const variants = {
        title: "text-2xl font-semibold text-gray-900 text-center",
        subtitle: "text-sm text-gray-500 text-center",
        body: "text-sm text-gray-600",
        desc: "text-xs text-gray-500"
    }
    return <p className={`${variants[variant]} ${classname}`}>{children}</p>
}

export default Text;