macro_rules! cls {
    ($($part:expr),* $(,)?) => {
        concat!($($part, " "),*).trim()
    };
}