from services import set_addition
import unittest


def value(a: str | None = "ab"):
    return a


class Tests(unittest.TestCase):
    def test_set_addition(self):
        """This test check working of services function"""
        # first value - model, second - role
        default_additions = [("gpt-4", "helpfull assistant"),
                             ("", ""), ("      ", "       "),
                             ("     ka    ", "    ma       ")]
        check_additions = [
            ("gpt-4", "helpfull assistant"),
            ("gpt-3.5-turbo", "code assistant"),
            ("gpt-3.5-turbo", "code assistant"),
            ("ka", "ma")]
        additions = list()

        for addition in default_additions:
            model, role = addition
            model, role = set_addition(model=model, role=role)
            additions.append((model, role))

        self.assertEqual(additions, check_additions)

    def test_default_value(self):
        a = None
        a = value()
        self.assertEqual(a, "ab")


if __name__ == "__main__":
    unittest.main()
