import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useLanguage } from './LanguageContext';
import { styled } from '@mui/material/styles';

const LanguageButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: '6px 12px',
  fontSize: '14px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const LanguageSwitcher = () => {
  const { currentLanguage, languages, switchLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    switchLanguage(lang);
    handleClose();
  };

  const currentLang = languages[currentLanguage];

  return (
    <>
      <LanguageButton
        onClick={handleClick}
        startIcon={<span>{currentLang.flag}</span>}
      >
        {currentLang.name}
      </LanguageButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.entries(languages).map(([code, lang]) => (
          <MenuItem
            key={code}
            onClick={() => handleLanguageChange(code)}
            selected={code === currentLanguage}
          >
            <span style={{ marginRight: '8px' }}>{lang.flag}</span>
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;