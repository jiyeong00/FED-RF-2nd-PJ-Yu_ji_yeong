package com.example.user.capstone_admin;

import android.app.Activity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.ContextMenu;
import android.view.KeyEvent;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.Toast;

import java.net.MalformedURLException;

public class Pw_activity extends Activity {
    Button okbtn,backbtn;
    TextView locker_sel,loc_num_sel,loc_numtv,pw_tv;
    EditText pw_edit;


    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pw_dialog);
        setTitle("비밀번호 변경");

        locker_sel = (TextView) findViewById(R.id.locker_sel);
        loc_numtv=(TextView)findViewById(R.id.loc_numtv);
        loc_num_sel=(TextView) findViewById(R.id.loc_num_sel);
        pw_tv=(TextView)findViewById(R.id.tv2);
        pw_edit=(EditText)findViewById(R.id.edit);

        okbtn=(Button)findViewById(R.id.ok);
        backbtn=(Button)findViewById(R.id.back);

        registerForContextMenu(locker_sel);
        registerForContextMenu(loc_num_sel);
        NetworkUtil.setNetworkPolicy();

        //사물함 버튼을 클릭했을 때 메뉴가 나옴
        locker_sel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
             PopupMenu p =new PopupMenu(getApplicationContext(),view);
             getMenuInflater().inflate(R.menu.lock_menu,p.getMenu());
             p.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                 @Override
                 public boolean onMenuItemClick(MenuItem menuItem) {
                     switch (menuItem.getItemId()){
                         case R.id.itemJSG:
                             Toast.makeText(getApplicationContext(),"정심관을 선택하였습니다.",Toast.LENGTH_SHORT).show();
                             loc_numtv.setVisibility(View.VISIBLE);
                             loc_num_sel.setVisibility(View.VISIBLE);
                             locker_sel.setText(menuItem.getTitle());
                             break;
                         case R.id.itemMRG:
                             Toast.makeText(getApplicationContext(),"목련관을 선택하였습니다.",Toast.LENGTH_SHORT).show();
                             loc_numtv.setVisibility(View.INVISIBLE);
                             loc_num_sel.setVisibility(View.INVISIBLE);
                             locker_sel.setText(menuItem.getTitle());
                             break;
                             default:
                                 break;
                     }
                     return false;
                 }


             });
             p.show();
            }
        });

        // 요개 두번째거잉
        loc_num_sel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                PopupMenu p =new PopupMenu(getApplicationContext(),view);
                getMenuInflater().inflate(R.menu.locknum_menu,p.getMenu());
                p.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
                    @Override
                    public boolean onMenuItemClick(MenuItem menuItem) {
                        switch (menuItem.getItemId()){
                            case R.id.item1:
                                Toast.makeText(getApplicationContext(),"201837204님의 사물함.",Toast.LENGTH_SHORT).show();
                                pw_tv.setVisibility(View.VISIBLE);
                                pw_edit.setVisibility(View.VISIBLE);
                                loc_num_sel.setText(menuItem.getTitle());
                                break;
                            case R.id.item2:
                                Toast.makeText(getApplicationContext(),"201841026님의 사물함.",Toast.LENGTH_SHORT).show();
                                pw_tv.setVisibility(View.VISIBLE);
                                pw_edit.setVisibility(View.VISIBLE);
                                loc_num_sel.setText(menuItem.getTitle());
                                break;
                            default:
                                break;
                        }
                        return false;
                    }
                });
                p.show();
            }
        });
        //세번째 임시비밀번호
        pw_edit.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int i, KeyEvent keyEvent) {
                if((keyEvent.getAction()==KeyEvent.ACTION_DOWN)&&(i==KeyEvent.KEYCODE_ENTER)){
                    if (loc_num_sel.getText().equals("201837204")){
                        try {
                            PHPRequest request = new PHPRequest("http://172.16.120.18/Adim_Pw_update.php");
                            request.PhPlckPassword(String.valueOf(pw_edit.getText().toString()));
                        }catch (MalformedURLException e){
                            e.printStackTrace();
                        }
                    }else if (loc_num_sel.getText().equals("201841026")){
                        try {
                            PHPRequest request = new PHPRequest("http://172.16.120.18/Adim_Pw_update2.php");
                            request.PhPlckPassword(String.valueOf(pw_edit.getText().toString()));
                        }catch (MalformedURLException e){
                            e.printStackTrace();
                        }
                    }
                    okbtn.setVisibility(View.VISIBLE);
                    backbtn.setVisibility(View.INVISIBLE);
                }
                return false;
            }
        });

        //확인 버튼을 눌렀을때 뒤로 감
        okbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(getApplicationContext(),"비밀번호가 변경되었습니다.",Toast.LENGTH_SHORT).show();
                finish();
            }
        });

        backbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });


    }

}


